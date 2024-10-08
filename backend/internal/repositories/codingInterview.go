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
	SaveCodingSnapshot(snapshot domains.CodingQuestionSnapshot) (domains.CodingQuestionSnapshot, error)
	SaveCodingSubmission(submission domains.CodingQuestionSubmission) (domains.CodingQuestionSubmission, error)
	SaveCodingSubmissionTestCaseResult(submissionTestCaseResult domains.CodingQuestionSubmissionTestCaseResult) (domains.CodingQuestionSubmissionTestCaseResult, error)
	AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error
	UpdateCodingQuestion(codingQuestionID uint, question domains.CodingQuestion) (domains.CodingQuestion, error)
	UpdateCodingDoneInRoom(roomID string, isDone bool) error
	DeleteCodingQuestion(codingQuestionID uint) error
}
