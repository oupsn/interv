package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorGetCompileToken             = fiber.NewError(fiber.StatusInternalServerError, "can not get compile token")
	ErrorGetCompileResult            = fiber.NewError(fiber.StatusInternalServerError, "can not get compile result")
	ErrorGetCodingInterviewQuestions = fiber.NewError(fiber.StatusInternalServerError, "can not get coding interview questions")
)

type ICodingInterviewService interface {
	//TODO: add get coding question by lobby id
	GetCodingInterviewQuestions() ([]domains.CodingQuestionResponse, error)
	GenerateCompileToken(req domains.CompilationRequest) (string, error)
	GetCompileResult(token string) (domains.CompilationResultResponse, error)
	SaveCodingSnapshot(code string) (string, error)
}
