package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type ICodingInterviewRepository interface {
	GetCodingQuestionList() ([]domains.CodingQuestionResponse, error)
	GetCodingQuestionByID(id int) (domains.CodingQuestion, error)
	GetCodingQuestionListInPortal(portalID int) ([]domains.CodingQuestion, error)
	GetCodingQuestionTestcaseByQuestionID(questionID int) ([]domains.CodingQuestionTestCase, error)
	SaveCodingQuestion(question domains.CodingQuestion) (domains.CodingQuestion, error)
	AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error
}
