package loaders

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/handlers"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"embed"
	"errors"
	"fmt"
	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"io/fs"
	"net/http"
	"time"
)

func SetupRoutes(dist embed.FS) {

	serverAddr := fmt.Sprintf("%s:%d", Env.ServerHost, Env.ServerPort)

	// Repositories
	var userRepo = repositories.NewUserRepository(*DB)

	// Services
	var userService = services.NewUserService(userRepo)

	// Handlers
	var userHandlers = handlers.NewUserHandler(userService)

	// Fiber App
	app := NewFiberApp()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     Env.ServerOrigins,
		AllowCredentials: true,
	}))

	f, err := fs.Sub(dist, "web/dist")

	if err != nil {
		panic(err)
	}

	// Routes
	v1 := app.Group("/api/v1")

	v1.Post("user.createUser", userHandlers.CreateUser)
	v1.Post("user.deleteUser", userHandlers.DeleteUser)

	app.Get("healthcheck", handlers.HealthCheck)
	app.Get("swagger/*", swagger.HandlerDefault)

	app.Use("*", filesystem.New(filesystem.Config{
		Root:         http.FS(f),
		Index:        "index.html",
		Browse:       true,
		NotFoundFile: "index.html",
	}))

	ListenAndServe(app, serverAddr)
}

func NewFiberApp() *fiber.App {
	fiberConfig := fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			// Status code defaults to 500
			code := fiber.StatusInternalServerError
			Message := "Something went wrong"

			// Retrieve the custom status code if it's a *fiber.Error
			var e *fiber.Error
			if errors.As(err, &e) {
				code = e.Code
				Message = e.Message
			}

			if err != nil {
				// In case the SendFile fails
				return ctx.Status(code).JSON(handlers.ErrResponse{
					Code:      code,
					Message:   Message,
					Timestamp: time.Now(),
				})
			}

			// Return from handler
			return nil
		},
	}

	app := fiber.New(fiberConfig)
	return app
}

func ListenAndServe(app *fiber.App, serverAddr string) {
	err := app.Listen(serverAddr)
	if err != nil {
		panic(err)
	}
}
