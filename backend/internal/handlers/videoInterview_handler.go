package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type VideoInterviewHandler struct {
	videoInterviewService services.IVideoInterviewService
}

func NewVideoInterviewHandler(videoInterviewService services.IVideoInterviewService) VideoInterviewHandler {
	return VideoInterviewHandler{
		videoInterviewService: videoInterviewService,
	}
}

// GetVideoInterviewContext
// @ID getVideoInterviewContext
// @Tags videoInterview
// @Summary Get video interview context
// @Accept json
// @Produce json
// @Param payload query VideoInterviewContextQuery true "query params for video interview context"
// @Success 200 {object} Response[VideoInterviewContextResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.getVideoInterviewContext [get]
func (v VideoInterviewHandler) GetVideoInterviewContext(c *fiber.Ctx) error {
	query := VideoInterviewContextQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return err
	}

	videoQuestion, err := v.videoInterviewService.GetVideoInterviewContext(query.LobbyID)
	if err != nil {
		return err
	}

	var questionSetting []VideoInterviewQuestionSetting
	for i, v := range videoQuestion {
		questionSetting = append(questionSetting,
			VideoInterviewQuestionSetting{
				QuestionID:    v.ID,
				QuestionIndex: i,
				Retry:         v.RetryAmount,
				TimeToPrepare: v.TimeToPrepare,
				TimeToAnswer:  v.TimeToAnswer,
				IsLast:        i == len(videoQuestion)-1,
			},
		)
	}

	return Ok(c, VideoInterviewContextResponse{
		TotalQuestion:   len(videoQuestion),
		QuestionSetting: questionSetting,
	})
}

// GetVideoInterviewQuestion
// @ID getVideoInterviewQuestion
// @Tags videoInterview
// @Summary Get video interview question
// @Accept json
// @Produce json
// @Param payload query VideoInterviewQuestionQuery true "query params for video interview question"
// @Success 200 {object} Response[VideoInterviewQuestionResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.getVideoInterviewQuestion [get]
func (v VideoInterviewHandler) GetVideoInterviewQuestion(c *fiber.Ctx) error {
	query := VideoInterviewQuestionQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return err
	}

	question, err := v.videoInterviewService.GetVideoInterviewQuestion(query.QuestionID)
	if err != nil {
		return err
	}

	return Ok(c, VideoInterviewQuestionResponse{
		QuestionId: question.ID,
		Topic:      question.Title,
	})
}

// SubmitVideoInterview
// @ID submitVideoInterview
// @Tags videoInterview
// @Summary Submit video interview
// @Accept multipart/form-data
// @Produce json
// @Param file formData file true "Video Interview File"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.submitVideoInterview [post]
func (v VideoInterviewHandler) SubmitVideoInterview(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed to read file")
	}

	err = v.videoInterviewService.SubmitVideoInterview(file)
	if err != nil {
		return err
	}

	return Ok(c, "Submit video interview successfully")
}
