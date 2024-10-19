package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
	"strconv"
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

	videoQuestion, err := v.videoInterviewService.GetVideoInterviewContext(query.RoomID)
	if err != nil {
		return err
	}

	var questionSetting []VideoInterviewQuestionSetting
	for i, v := range videoQuestion {
		questionSetting = append(questionSetting,
			VideoInterviewQuestionSetting{
				QuestionID:    v.ID,
				QuestionIndex: i,
				TotalAttempt:  v.TotalAttempt,
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
// @Param roomId formData string true "Room ID"
// @Param candidateId formData uint true "Candidate ID"
// @Param videoQuestionId formData uint true "Video Question ID"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.submitVideoInterview [post]
func (v VideoInterviewHandler) SubmitVideoInterview(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed to read file")
	}
	roomId := c.FormValue("roomId")
	candidateId := c.FormValue("candidateId")
	videoQuestionId := c.FormValue("videoQuestionId")

	candidateIdInt, err := strconv.Atoi(candidateId)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed to parse candidateId")
	}

	videoQuestionIdInt, err := strconv.Atoi(videoQuestionId)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed to parse videoQuestionId")
	}

	err = v.videoInterviewService.SubmitVideoInterview(file, roomId, uint(candidateIdInt), uint(videoQuestionIdInt))
	if err != nil {
		return err
	}

	return Ok(c, "Submit video interview successfully")
}

// GetVideoInterviewResult
// @ID getVideoInterviewResult
// @Tags videoInterview
// @Summary Get video interview result
// @Accept json
// @Produce json
// @Param payload query VideoInterviewResultQuery true "query params for video interview result"
// @Success 200 {object} Response[[]VideoInterviewResultResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoInterview.getVideoInterviewResult [get]
func (v VideoInterviewHandler) GetVideoInterviewResult(c *fiber.Ctx) error {
	query := VideoInterviewResultQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err !=
		nil {
		return err
	}

	result, err := v.videoInterviewService.GetVideoInterviewResult(query.UserID)
	if err != nil {
		return err
	}

	var response []VideoInterviewResultResponse
	for _, v := range result {
		response = append(response, VideoInterviewResultResponse{
			Question:  v.VideoQuestion.Title,
			VideoPath: v.FileName,
		})
	}

	return Ok(c, response)
}
