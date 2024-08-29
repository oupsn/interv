package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type ICodingInterviewRepository interface {
	GetCodingQuestionList() ([]domains.CodingQuestionResponse, error)
	GetCodingQuestionByID(id int) (domains.CodingQuestion, error)
	GetCodingQuestionExampleByID(id int) (domains.CodingQuestionExample, error)
	GetCodingQuestionTestcaseByID(id int) (domains.CodingQuestionTestCase, error)
}
