package loaders

import (
	"errors"
	"fmt"
	"time"

	swagger "github.com/arsmn/fiber-swagger/v2"
	"github.com/spf13/viper"

	_ "csgit.sit.kmutt.ac.th/interv/interv-platform/docs"
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
	var mailRepositories = repositories.NewMailRepository(*MAILJET)
	var videoQuestionRepositories = repositories.NewVideoQuestionRepository(*DB)
	var roomRepositories = repositories.NewRoomRepository(*DB)
	var workspaceRepositories = repositories.NewWorkspaceRepository(*DB)
	var userInWorkspaceRepositories = repositories.NewUserInWorkspaceRepository(*DB)
	var portalRepository = repositories.NewPortalRepository(*DB)
	var userInPoratlRepository = repositories.NewUserInPortalRepository(*DB)

	// Services
	var userServices = services.NewUserService(userRepositories, userInWorkspaceRepositories, userInPoratlRepository, workspaceRepositories)
	var videoInterviewServices = services.NewVideoInterviewService(objectRepositories, videoQuestionRepositories, roomRepositories)
	var objectServices = services.NewObjectService(objectRepositories)
	var codingInterviewServices = services.NewCodingInterviewService(compilationRespositories, codingInterviewRepositories)
	var mailServices = services.NewMailService(mailRepositories)
	var questionServices = services.NewVideoQuestionService(videoQuestionRepositories)
	var roomServices = services.NewRoomService(roomRepositories)
	var portalService = services.NewPortalService(portalRepository)
	var userInportalService = services.NewUserInPortalService(userInPoratlRepository)
	var workspaceService = services.NewWorkspaceService(workspaceRepositories, userInWorkspaceRepositories, userRepositories, userInportalService)
	var authServices = services.NewAuthService(userRepositories, userInportalService)

	// Handlers
	var userHandlers = handlers.NewUserHandler(userServices)
	var authHandlers = handlers.NewAuthHandler(authServices)
	var videoInterviewHandlers = handlers.NewVideoInterviewHandler(videoInterviewServices)
	var objectHandlers = handlers.NewObjectHandler(objectServices)
	var codingInterviewHandlers = handlers.NewCodingInterviewHandler(codingInterviewServices)
	var mailHandlers = handlers.NewMailHandler(mailServices)
	var questionHandlers = handlers.NewVideoQuestionHandler(questionServices)
	var roomHandlers = handlers.NewRoomHandler(roomServices)
	var workspaceHandlers = handlers.NewWorkspaceHandler(workspaceService, userInportalService, authServices)
	var portalHandler = handlers.NewPortalHandler(portalService)

	// Fiber App
	app := NewFiberApp()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     viper.GetString(EnvServerOrigins),
		AllowCredentials: true,
	}))

	// Public Routes
	public := app.Group("/api")
	public.Get("healthcheck", handlers.HealthCheck)
	public.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Interv 🕊️")
	})

	// user
	public.Post("user.createUser", userHandlers.CreateUser)
	public.Post("user.createAdmin", userHandlers.CreateAdmin)

	// auth
	public.Post("auth.login", authHandlers.Login)
	public.Post("auth.logout", authHandlers.Logout)
	public.Get("auth.me", authHandlers.Me)

	// video interview
	public.Get("videoInterview.getVideoInterviewContext", videoInterviewHandlers.GetVideoInterviewContext)
	public.Get("videoInterview.getVideoInterviewQuestion", videoInterviewHandlers.GetVideoInterviewQuestion)
	public.Post("videoInterview.submitVideoInterview", videoInterviewHandlers.SubmitVideoInterview)

	// codingInterview
	public.Get("codingInterview.getQuestions", codingInterviewHandlers.GetQuestions)
	public.Get("codingInterview.getQuestionsInPortal/:portalId", codingInterviewHandlers.GetQuestionsInPortal)
	public.Get("codingInterview.getQuestionByTitle/:title", codingInterviewHandlers.GetQuestionByTitle)
	public.Post("codingInterview.getCompileResult", codingInterviewHandlers.GetCompileResult)
	public.Post("codingInterview.createQuestion", codingInterviewHandlers.CreateQuestion)
	public.Post("codingInterview.addQuestion", codingInterviewHandlers.AddQuestion)
	public.Post("codingInterview.createQuestionSnapshot", codingInterviewHandlers.CreateCodingQuestionSnapshot)
	public.Put("codingInterview.updateQuestion/:codingQuestionID", codingInterviewHandlers.UpdateQuestion)
	public.Delete("codingInterview.deleteQuestion/:codingQuestionID", codingInterviewHandlers.DeleteQuestion)

	// video question
	public.Post("videoQuestion.createVideoQuestion", questionHandlers.CreateVideoQuestion)
	public.Get("videoQuestion.getVideoQuestion", questionHandlers.GetVideoQuestion)
	public.Get("videoQuestion.getVideoQuestionByPortalId", questionHandlers.GetVideoQuestionByPortalId)
	public.Post("videoQuestion.updateVideoQuestion", questionHandlers.UpdateVideoQuestion)
	public.Post("videoQuestion.deleteVideoQuestion", questionHandlers.DeleteVideoQuestion)

	// Room
	public.Post("room.createRoom", roomHandlers.CreateRoom)
	public.Get("room.getRoomContext", roomHandlers.GetRoomContext)
	public.Post("room.updateRoomContext", roomHandlers.UpdateRoomContext)

	// portal
	public.Get("portal.get", portalHandler.GetPortalById)
	public.Post("portal.create", portalHandler.CreatePortal)
	public.Delete("portal.delete", portalHandler.DeletePortalById)

	// Private Routes
	private := app.Group("/api")
	private.Use(JwtAuthentication)

	// Swagger
	private.Get("swagger/*", swagger.HandlerDefault)

	// User
	private.Post("user.deleteUser", userHandlers.DeleteUser)

	// Auth

	// Workspace
	private.Get("workspace.get", workspaceHandlers.GetWorkspaceById)
	private.Get("workspace.getByPortal", workspaceHandlers.GetPortalWorkspace)
	private.Post("workspace.create", workspaceHandlers.CreateWorkspace)
	private.Delete("workspace.delete", workspaceHandlers.DeleteWorkspaceById)

	//// UserInWorkspace
	private.Get("userInWorkspace.get", workspaceHandlers.GetUserInWorkspace)
	private.Delete("userInWorkspace.delete", workspaceHandlers.DeleteUserFromWorkspace)

	// Object
	private.Post("object.uploadObject", objectHandlers.UploadObject)
	private.Post("object.getObject", objectHandlers.GetObject)

	// Mail
	private.Post("mail.sendMail", mailHandlers.SendMail)

	ListenAndServe(app, serverAddr)
}

func NewFiberApp() *fiber.App {
	fiberConfig := fiber.Config{
		AppName: "🕊️",
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			// Status code defaults to 500
			code := fiber.StatusInternalServerError
			Message := ""
			if err != nil {
				Message = err.Error()
				if Message == "" {
					Message = "Something went wrong"
				}
			}

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
