package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type VideoInterviewHandler struct {
}

func NewVideoInterviewHandler() VideoInterviewHandler {
	return VideoInterviewHandler{}
}

// GetVideoInterviewContext
// @ID getVideoInterviewContext
// @Tags videoInterview
// @Summary Get video interview context
// @Accept json
// @Produce json
// @Param payload query VideoInterviewContextQuery false "query params for video interview context"
// @Success 200 {object} Response[VideoInterviewContextResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.getVideoInterviewContext [get]
func (a VideoInterviewHandler) GetVideoInterviewContext(c *fiber.Ctx) error {
	query := VideoInterviewContextQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var questionSetting []VideoInterviewQuestionSetting
	questionSetting = append(questionSetting,
		VideoInterviewQuestionSetting{
			QuestionIndex: 1,
			Retry:         2,
			TimeToPrepare: 3,
			TimeToAnswer:  3,
			IsLast:        false,
		},
		VideoInterviewQuestionSetting{
			QuestionIndex: 2,
			Retry:         2,
			TimeToPrepare: 3,
			TimeToAnswer:  3,
			IsLast:        false,
		},
		VideoInterviewQuestionSetting{
			QuestionIndex: 3,
			Retry:         3,
			TimeToPrepare: 3,
			TimeToAnswer:  3,
			IsLast:        true,
		},
	)

	return Ok(c, VideoInterviewContextResponse{
		TotalQuestion:   len(questionSetting),
		QuestionSetting: questionSetting,
	})
}

// GetVideoInterviewQuestion
// @ID getVideoInterviewQuestion
// @Tags videoInterview
// @Summary Get video interview question
// @Accept json
// @Produce json
// @Param payload query VideoInterviewQuestionQuery false "query params for video interview question"
// @Success 200 {object} Response[VideoInterviewQuestionResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.getVideoInterviewQuestion [get]
func (a VideoInterviewHandler) GetVideoInterviewQuestion(c *fiber.Ctx) error {
	query := VideoInterviewQuestionQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	return Ok(c, VideoInterviewQuestionResponse{
		QuestionIndex: query.QuestionIndex,
		Topic:         "This is topic" + query.LobbyID,
	})
}
