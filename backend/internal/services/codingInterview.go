package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorGetCompileToken                   = fiber.NewError(fiber.StatusInternalServerError, "can not get compile token")
	ErrorGetCompileResult                  = fiber.NewError(fiber.StatusInternalServerError, "can not get compile result")
	ErrorGetCodingInterviewQuestions       = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview questions")
	ErrorGetCodingInterviewTestcase        = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview testcase")
	ErrorCreateCodingQuestion              = fiber.NewError(fiber.StatusInternalServerError, "can not create coding question")
	ErrorGetCodingInterviewQuestionByTitle = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview question by title")
	ErrorCreateCodingSnapshot              = fiber.NewError(fiber.StatusInternalServerError, "can not create coding snapshot")
)

type ICodingInterviewService interface {
	//TODO: add get coding question by room id
	GetCodingInterviewQuestions() ([]domains.CodingQuestionResponse, error)
	GetCodingInterviewQuestionByTitle(title string) (domains.CodingQuestionResponse, error)
	GetCodingInterviewQuestionsInPortal(portalID int) ([]domains.CodingQuestion, error)
	GenerateCompileToken(req domains.CompilationRequest) (string, error)
	GetCompileResult(req domains.CompilationRequest) ([]domains.CompilationResultResponse, error)
	CreateCodingQuestion(req domains.CodingQuestion) (domains.CreateCodingQuestionResponse, error)
	CreateCodingSnapshot(req []domains.CodingQuestionSnapshot) (domains.CreateCodingQuestionResponse, error)
	AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error
	DeleteCodingQuestion(codingQuestionID uint) error
	UpdateCodingQuestion(codingQuestionID uint, question domains.CodingQuestion) (domains.CodingQuestion, error)
}
