package services

import (
	"mime/multipart"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorGetCompileToken                      = fiber.NewError(fiber.StatusInternalServerError, "can not get compile token")
	ErrorGetCompileResult                     = fiber.NewError(fiber.StatusInternalServerError, "can not get compile result")
	ErrorGetCodingInterviewQuestions          = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview questions")
	ErrorGetCodingInterviewTestcase           = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview testcase")
	ErrorCreateCodingQuestion                 = fiber.NewError(fiber.StatusInternalServerError, "can not create coding question")
	ErrorGetCodingInterviewQuestionByTitle    = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview question by title")
	ErrorCreateCodingSnapshot                 = fiber.NewError(fiber.StatusInternalServerError, "can not create coding snapshot")
	ErrorCreateCodingSubmission               = fiber.NewError(fiber.StatusInternalServerError, "can not create coding submission")
	ErrorGetLintResult                        = fiber.NewError(fiber.StatusInternalServerError, "can not get lint result")
	ErrorCreateCodingSubmissionTestCaseResult = fiber.NewError(fiber.StatusInternalServerError, "can not create coding submission test case result")
	ErrorEncodingLintResult                   = fiber.NewError(fiber.StatusInternalServerError, "can not encode lint result")
	ErrorEncodingCompileResult                = fiber.NewError(fiber.StatusInternalServerError, "can not encode compile result")
	ErrorGetCodingSubmissionResultByUser      = fiber.NewError(fiber.StatusInternalServerError, "can not get coding submission result by user")
	ErrorGetObjectSubmission                  = fiber.NewError(fiber.StatusInternalServerError, "can not get object submission")
	ErrorGetRoomIDByUserID                    = fiber.NewError(fiber.StatusInternalServerError, "can not get room id by user id")
)

type ICodingInterviewService interface {
	//TODO: add get coding question by room id
	GetCodingInterviewQuestionRoomContext(roomID string) (domains.CodingQuestionRoomContext, error)
	GetCodingInterviewQuestions(roomID string) ([]domains.CodingQuestionResponse, error)
	GetCodingInterviewQuestionByTitle(title string) (domains.CodingQuestionResponse, error)
	GetCodingInterviewQuestionsInPortal(portalID int) ([]domains.CodingQuestion, error)
	GetCodingInterviewQuestionsInWorkspace(workspaceId int) ([]domains.CodingQuestion, error)
	GetCodingSubmissionResultByUser(userID uint) (domains.CodingQuestionSubmissionResult, error)
	GenerateCompileToken(req domains.CompilationRequest) (string, error)
	GetCompileResult(req domains.CompilationRequest) ([]domains.CompilationResultResponse, error)
	CreateCodingQuestion(req domains.CodingQuestion, portalID uint) (domains.CreateCodingQuestionResponse, error)
	CreateCodingSnapshot(req []domains.CodingQuestionSnapshot) (domains.CreateCodingQuestionResponse, error)
	CreateCodingSubmission(req []domains.CreateCodingSubmissionRequest) (domains.CreateCodingSubmissionResponse, error)
	AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error
	DeleteCodingQuestion(codingQuestionID uint) error
	DeleteCodingQuestionInWorkspace(workspaceID uint) error
	UpdateCodingQuestion(codingQuestionID uint, question domains.CodingQuestion) (domains.CodingQuestion, error)
	UploadCodingVideo(roomID string, screenFile *multipart.FileHeader, videoFile *multipart.FileHeader) error
}
