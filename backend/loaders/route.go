package loaders

import (
	"errors"
	"fmt"
	swagger "github.com/arsmn/fiber-swagger/v2"
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
	var objectRepositories = repositories.NewObjectRepository(*MINIO)
	var compilationRespositories = repositories.NewCodeCompilationRepository(viper.GetString(EnvCompilerEndpoint))
	var codingInterviewRepositories = repositories.NewCodingInterviewRepository(*DB)

	// Services
	var userServices = services.NewUserService(userRepositories)
	var authServices = services.NewAuthService(userRepositories)
	var videoInterviewServices = services.NewVideoInterviewService(objectRepositories)
	var objectServices = services.NewObjectService(objectRepositories)
	var codingInterviewServices = services.NewCodingInterviewService(compilationRespositories, codingInterviewRepositories)

	// Handlers
	var userHandlers = handlers.NewUserHandler(userServices)
	var authHandlers = handlers.NewAuthHandler(authServices)
	var videoInterviewHandlers = handlers.NewVideoInterviewHandler(videoInterviewServices)
	var objectHandlers = handlers.NewObjectHandler(objectServices)
	var codingInterviewHandlers = handlers.NewCodingInterviewHandler(codingInterviewServices)

	// Fiber App
	app := NewFiberApp()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     viper.GetString(EnvServerOrigins),
		AllowCredentials: true,
	}))

	// Public Routes
	public := app.Group("/api")
	public.Get("healthcheck", handlers.HealthCheck)
	public.Get("swagger/*", swagger.HandlerDefault)
	public.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Interv 🕊️")
	})

	// user
	public.Post("user.createUser", userHandlers.CreateUser)

	// auth
	public.Post("auth.login", authHandlers.Login)
	public.Post("auth.logout", authHandlers.Logout)
	public.Get("auth.me", authHandlers.Me)

	// videoInterview
	public.Get("videoInterview.getVideoInterviewContext", videoInterviewHandlers.GetVideoInterviewContext)
	public.Get("videoInterview.getVideoInterviewQuestion", videoInterviewHandlers.GetVideoInterviewQuestion)
	public.Post("videoInterview.submitVideoInterview", videoInterviewHandlers.SubmitVideoInterview)

	// codingInterview
	public.Post("codingInterview.generateCompileToken", codingInterviewHandlers.GenerateCompileToken)
	public.Get("codingInterview.getCompileResult/:token", codingInterviewHandlers.GetCompileResult)
	public.Get("codingInterview.getQuestions", codingInterviewHandlers.GetQuestions)
	// Private Routes
	private := app.Group("/api")
	private.Use(JwtAuthentication)

	// User
	private.Post("user.deleteUser", userHandlers.DeleteUser)

	// Auth

	// portal

	// Object
	private.Post("object.uploadObject", objectHandlers.UploadObject)
	private.Post("object.getObject", objectHandlers.GetObject)

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
		StreamRequestBody: true,
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
