package loaders

import (
	"errors"
	"fmt"
	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/handlers"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetupRoutes() {

	serverAddr := fmt.Sprintf("%s:%d", viper.GetString(EnvServerHost), viper.GetInt(EnvServerPort))

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
		AllowOrigins:     viper.GetString(EnvServerOrigins),
		AllowCredentials: true,
	}))

	// Public Routes
	app.Post("api/user.createUser", userHandlers.CreateUser)
	app.Post("api/auth.login", authHandlers.Login)
	app.Post("api/auth.logout", authHandlers.Logout)
	app.Get("api/healthcheck", handlers.HealthCheck)
	app.Get("api/swagger/*", swagger.HandlerDefault)
	app.Get("api/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Interv 🕊️")
	})

	// Private Routes
	api := app.Group("/api")
	api.Use(func(c *fiber.Ctx) error {
		token := c.Cookies("token", "")
		_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(viper.GetString("JWT_SECRET")), nil
		})

		if err != nil {
			print("Error ", err.Error(), "\n")
			return fiber.ErrUnauthorized
		}

		return c.Next()
	})

	// User
	api.Post("user.deleteUser", userHandlers.DeleteUser)

	// Auth
	api.Get("auth.me", authHandlers.Me)

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
