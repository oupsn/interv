package repositories

import (
	"fmt"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type codingInterviewRepository struct {
	DB gorm.DB
}

func NewCodingInterviewRepository(db gorm.DB) ICodingInterviewRepository {
	return &codingInterviewRepository{
		DB: db,
	}
}

// TODO: Add lobbyId to filter coding question by lobby
func (c *codingInterviewRepository) GetCodingQuestionList() ([]domains.CodingQuestionResponse, error) {
	var codingQuestions []domains.CodingQuestion

	if err := c.DB.Preload("TestCases", "is_example = ?", true).Find(&codingQuestions).Error; err != nil {
		return nil, err
	}

	var codingQuestionResponses []domains.CodingQuestionResponse
	for _, codingQuestion := range codingQuestions {
		var testCaseResponses []domains.CodingQuestionTestCaseResponse
		for _, testCase := range codingQuestion.TestCases {
			testCaseResponses = append(testCaseResponses, domains.CodingQuestionTestCaseResponse{
				Input:  testCase.Input,
				Output: testCase.Output,
			})
		}
		codingQuestionResponses = append(codingQuestionResponses, domains.CodingQuestionResponse{
			Id:                codingQuestion.Id,
			Title:             codingQuestion.Title,
			Description:       codingQuestion.Description,
			InputDescription:  codingQuestion.InputDescription,
			OutputDescription: codingQuestion.OutputDescription,
			TestCase:          testCaseResponses,
		})
	}

	return codingQuestionResponses, nil
}

func (c *codingInterviewRepository) GetCodingQuestionListInPortal(portalID int) ([]domains.CodingQuestion, error) {
	var codingQuestions []domains.CodingQuestion
	if err := c.DB.Preload("CodingQuestionInPortal.Portal", "id = ?", portalID).
		Order("created_at DESC").
		Find(&codingQuestions).Error; err != nil {
		return nil, err
	}
	return codingQuestions, nil
}
func (c *codingInterviewRepository) GetCodingQuestionByTitle(title string) (domains.CodingQuestionResponse, error) {
	var codingQuestion domains.CodingQuestion

	if err := c.DB.Preload("TestCases").First(&codingQuestion, "title = ?", title).Error; err != nil {
		return domains.CodingQuestionResponse{}, err
	}
	var testCaseResponses []domains.CodingQuestionTestCaseResponse
	for _, testCase := range codingQuestion.TestCases {
		testCaseResponses = append(testCaseResponses, domains.CodingQuestionTestCaseResponse{
			Input:  testCase.Input,
			Output: testCase.Output,
		})
	}
	return domains.CodingQuestionResponse{
		Id:                codingQuestion.Id,
		Title:             codingQuestion.Title,
		Description:       codingQuestion.Description,
		InputDescription:  codingQuestion.InputDescription,
		OutputDescription: codingQuestion.OutputDescription,
		TestCase:          testCaseResponses,
	}, nil
}

func (c *codingInterviewRepository) GetCodingQuestionTestcaseByQuestionID(questionID int) ([]domains.CodingQuestionTestCase, error) {
	var testCases []domains.CodingQuestionTestCase
	if err := c.DB.Where("coding_question_id = ?", questionID).Find(&testCases).Error; err != nil {
		return nil, err
	}
	return testCases, nil
}

func (c *codingInterviewRepository) SaveCodingQuestion(question domains.CodingQuestion) (domains.CodingQuestion, error) {
	if err := c.DB.Create(&question).Error; err != nil {
		return domains.CodingQuestion{}, err
	}
	return question, nil
}

func (c *codingInterviewRepository) AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error {
	if target == "portal" {
		if err := c.DB.Create(&domains.CodingQuestionInPortal{
			CodingQuestionID: codingQuestionID,
			PortalID:         targetID,
		}).Error; err != nil {
			return err
		}
	} else if target == "workspace" {
		if err := c.DB.Create(&domains.CodingQuestionInWorkspace{
			CodingQuestionID: codingQuestionID,
			WorkspaceID:      targetID,
		}).Error; err != nil {
			return err
		}
	} else {
		return fmt.Errorf("invalid target: %s", target)
	}
	return nil
}

func (c *codingInterviewRepository) DeleteCodingQuestion(codingQuestionID uint) error {
	if err := c.DB.Delete(&domains.CodingQuestion{}, codingQuestionID).Error; err != nil {
		return err
	}
	return nil
}
