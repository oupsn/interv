package repositories

import (
	"fmt"
	"net/url"

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

// TODO: Add roomId to filter coding question by room
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
	if err := c.DB.Distinct("coding_questions.*").
		Joins("JOIN coding_question_in_portals ON coding_questions.id = coding_question_in_portals.coding_question_id").
		Where("coding_question_in_portals.portal_id = ?", portalID).
		Find(&codingQuestions).Error; err != nil {
		return nil, err
	}
	return codingQuestions, nil
}

func (c *codingInterviewRepository) GetCodingQuestionListInWorkspace(workspaceId int) ([]domains.CodingQuestion, error) {
	var codingQuestions []domains.CodingQuestion
	if err := c.DB.Distinct("coding_questions_in_workspaces.*").
		Joins("JOIN coding_question_in_workspaces ON coding_questions.id = coding_question_in_workspaces.coding_question_id").
		Where("coding_question_in_workspaces.workspace_id = ?", workspaceId).
		Find(&codingQuestions).Error; err != nil {
		return nil, err
	}
	return codingQuestions, nil
}

func (c *codingInterviewRepository) GetCodingQuestionByTitle(title string) (domains.CodingQuestionResponse, error) {
	var codingQuestion domains.CodingQuestion
	decodedTitle, err := url.QueryUnescape(title)
	if err != nil {
		return domains.CodingQuestionResponse{}, fmt.Errorf("failed to decode title: %w", err)
	}

	if err := c.DB.Preload("TestCases").First(&codingQuestion, "title = ?", decodedTitle).Error; err != nil {
		return domains.CodingQuestionResponse{}, err
	}
	var testCaseResponses []domains.CodingQuestionTestCaseResponse
	for _, testCase := range codingQuestion.TestCases {
		testCaseResponses = append(testCaseResponses, domains.CodingQuestionTestCaseResponse{
			Input:     testCase.Input,
			Output:    testCase.Output,
			IsExample: testCase.IsExample,
			IsHidden:  testCase.IsHidden,
		})
	}
	return domains.CodingQuestionResponse{
		Id:                codingQuestion.Id,
		Title:             codingQuestion.Title,
		Description:       codingQuestion.Description,
		InputDescription:  codingQuestion.InputDescription,
		OutputDescription: codingQuestion.OutputDescription,
		TestCase:          testCaseResponses,
		Difficulty:        codingQuestion.Difficulty,
	}, nil
}

func (c *codingInterviewRepository) GetCodingQuestionTestcaseByQuestionID(questionID int) ([]domains.CodingQuestionTestCase, error) {
	var testCases []domains.CodingQuestionTestCase
	if err := c.DB.Where("coding_question_id = ?", questionID).Find(&testCases).Error; err != nil {
		return nil, err
	}
	return testCases, nil
}

func (c *codingInterviewRepository) GetCodingQuestionByWorkspaceID(workspaceID int) ([]domains.CodingQuestionInWorkspace, error) {
	var codingQuestions []domains.CodingQuestionInWorkspace
	if err := c.DB.Model(&domains.CodingQuestionInWorkspace{}).Preload("CodingQuestion", "id = ?", workspaceID).
		Find(&codingQuestions).Error; err != nil {
		return nil, err
	}
	return codingQuestions, nil
}

func (c *codingInterviewRepository) GetCodingQuestionSubmissionByUserID(userID uint) ([]domains.CodingQuestionSubmission, error) {
	//get room id from user id
	var roomID string
	if err := c.DB.Model(&domains.Room{}).Where("candidate_id = ?", userID).Pluck("id", &roomID).Error; err != nil {
		return nil, err
	}
	var codingQuestionSubmissions []domains.CodingQuestionSubmission

	if err := c.DB.Where("room_id = ?", roomID).Find(&codingQuestionSubmissions).Error; err != nil {
		return nil, err
	}
	var response []domains.CodingQuestionSubmission
	for _, codingQuestionSubmission := range codingQuestionSubmissions {
		var testCaseResults []domains.CodingQuestionSubmissionTestCaseResult
		var codingQuestion domains.CodingQuestion
		if err := c.DB.Where("submission_id = ?", codingQuestionSubmission.Id).Find(&testCaseResults).Error; err != nil {
			return nil, err
		}
		if err := c.DB.Where("id = ?", codingQuestionSubmission.QuestionID).Find(&codingQuestion).Error; err != nil {
			return nil, err
		}
		for ind, testCaseResult := range testCaseResults {
			var testCase domains.CodingQuestionTestCase
			if err := c.DB.Where("id = ?", testCaseResult.TestCaseId).Find(&testCase).Error; err != nil {
				return nil, err
			}
			testCaseResults[ind].TestCase = testCase
		}

		codingQuestionSubmission.Question = codingQuestion
		codingQuestionSubmission.TestCasesResult = testCaseResults
		response = append(response, codingQuestionSubmission)
	}

	return response, nil
}

func (c *codingInterviewRepository) SaveCodingQuestion(question domains.CodingQuestion) (domains.CodingQuestion, error) {
	if err := c.DB.Create(&question).Error; err != nil {
		return domains.CodingQuestion{}, err
	}
	return question, nil
}

func (c *codingInterviewRepository) GetRoomIDByUserID(userID uint) (string, error) {
	var roomID string
	if err := c.DB.Model(&domains.Room{}).Where("candidate_id = ?", userID).Pluck("id", &roomID).Error; err != nil {
		return "", err
	}
	return roomID, nil
}

func (c *codingInterviewRepository) SaveCodingSnapshot(snapshot domains.CodingQuestionSnapshot) (domains.CodingQuestionSnapshot, error) {
	if err := c.DB.Create(&snapshot).Error; err != nil {
		return domains.CodingQuestionSnapshot{}, err
	}
	return snapshot, nil
}

func (c *codingInterviewRepository) SaveCodingSubmission(submission domains.CodingQuestionSubmission) (domains.CodingQuestionSubmission, error) {
	if err := c.DB.Create(&submission).Error; err != nil {
		return domains.CodingQuestionSubmission{}, err
	}
	return submission, nil
}

func (c *codingInterviewRepository) SaveCodingSubmissionTestCaseResult(submissionTestCaseResult domains.CodingQuestionSubmissionTestCaseResult) (domains.CodingQuestionSubmissionTestCaseResult, error) {
	if err := c.DB.Create(&submissionTestCaseResult).Error; err != nil {
		return domains.CodingQuestionSubmissionTestCaseResult{}, err
	}
	return submissionTestCaseResult, nil
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

func (c *codingInterviewRepository) UpdateCodingQuestion(codingQuestionID uint, question domains.CodingQuestion) (domains.CodingQuestion, error) {
	tx := c.DB.Begin()
	if err := tx.Model(&domains.CodingQuestion{}).Where("id = ?", codingQuestionID).Updates(question).Error; err != nil {
		tx.Rollback()
		return domains.CodingQuestion{}, err
	}
	var existingTestCaseIDs []uint
	if err := tx.Model(&domains.CodingQuestionTestCase{}).Where("coding_question_id = ?", codingQuestionID).Pluck("id", &existingTestCaseIDs).Error; err != nil {
		tx.Rollback()
		return domains.CodingQuestion{}, err
	}
	updatedTestCaseIDs := make(map[uint]bool)
	for _, testCase := range question.TestCases {
		if testCase.ID == 0 {
			testCase.CodingQuestionID = codingQuestionID
			if err := tx.Create(&testCase).Error; err != nil {
				tx.Rollback()
				return domains.CodingQuestion{}, err
			}
			updatedTestCaseIDs[testCase.ID] = true
		} else {
			if err := tx.Model(&domains.CodingQuestionTestCase{}).Where("id = ?", testCase.ID).Updates(testCase).Error; err != nil {
				tx.Rollback()
				return domains.CodingQuestion{}, err
			}
			updatedTestCaseIDs[testCase.ID] = true
		}
	}

	for _, id := range existingTestCaseIDs {
		if !updatedTestCaseIDs[id] {
			if err := tx.Delete(&domains.CodingQuestionTestCase{}, id).Error; err != nil {
				tx.Rollback()
				return domains.CodingQuestion{}, err
			}
		}
	}
	if err := tx.Commit().Error; err != nil {
		return domains.CodingQuestion{}, err
	}

	var updatedQuestion domains.CodingQuestion
	if err := c.DB.Preload("TestCases").First(&updatedQuestion, codingQuestionID).Error; err != nil {
		return domains.CodingQuestion{}, err
	}

	return updatedQuestion, nil
}
func (c *codingInterviewRepository) UpdateCodingDoneInRoom(roomID string, isDone bool) error {
	if err := c.DB.Model(&domains.Room{}).Where("id = ?", roomID).Update("is_coding_done", isDone).Error; err != nil {
		return err
	}
	return nil
}

func (c *codingInterviewRepository) DeleteCodingQuestion(codingQuestionID uint) error {
	if err := c.DB.Delete(&domains.CodingQuestion{}, codingQuestionID).Error; err != nil {
		return err
	}
	return nil
}

func (c *codingInterviewRepository) DeleteCodingQuestionInWorkspace(workspaceID uint) error {
	if err := c.DB.
		Where("workspace_id = ?", workspaceID).
		Delete(&domains.CodingQuestionInWorkspace{}).Error; err != nil {
		return err
	}
	return nil
}
