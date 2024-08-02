package loaders

import (
	"errors"
	"fmt"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/handlers"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetupRoutes() {

	serverAddr := fmt.Sprintf("%s:%d", Env.ServerHost, Env.ServerPort)

	// Repositories
	var userRepositories = repositories.NewUserRepository(*DB)

	// Services
	var userServices = services.NewUserService(userRepositories)
	var authServices = services.NewAuthService(userRepositories)

	// Handlers
	var userHandlers = handlers.NewUserHandler(userServices)
	var authHandlers = handlers.NewAuthHandler(authServices)

	// Fiber App
	app := NewFiberApp()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     Env.ServerOrigins,
		AllowCredentials: true,
	}))

	// Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Interv!")
	})

	v1 := app.Group("/api/v1")
	v1.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Interv 🕊️")
	})

	// User
	v1.Post("user.createUser", userHandlers.CreateUser)
	v1.Post("user.deleteUser", userHandlers.DeleteUser)

	// Auth
	v1.Get("auth.me", authHandlers.Me)
	v1.Post("auth.login", authHandlers.Login)
	v1.Post("auth.logout", authHandlers.Logout)

	app.Get("healthcheck", handlers.HealthCheck)
	app.Get("swagger/*", swagger.HandlerDefault)

	ListenAndServe(app, serverAddr)
}

func NewFiberApp() *fiber.App {
	fiberConfig := fiber.Config{
		AppName: "🕊️",
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
