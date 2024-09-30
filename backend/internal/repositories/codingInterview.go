package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type ICodingInterviewRepository interface {
	GetCodingQuestionList() ([]domains.CodingQuestionResponse, error)
	GetCodingQuestionByTitle(title string) (domains.CodingQuestionResponse, error)
	GetCodingQuestionListInPortal(portalID int) ([]domains.CodingQuestion, error)
	GetCodingQuestionTestcaseByQuestionID(questionID int) ([]domains.CodingQuestionTestCase, error)
	SaveCodingQuestion(question domains.CodingQuestion) (domains.CodingQuestion, error)
	AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error
	DeleteCodingQuestion(codingQuestionID uint) error
}
