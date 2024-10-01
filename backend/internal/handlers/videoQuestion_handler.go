package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type VideoQuestionHandler struct {
	videoQuestionService services.IVideoQuestionService
}

func NewVideoQuestionHandler(videoQuestionService services.IVideoQuestionService) VideoQuestionHandler {
	return VideoQuestionHandler{
		videoQuestionService: videoQuestionService,
	}
}

// CreateVideoQuestion
// @ID createVideoQuestion
// @Tags videoQuestion
// @Summary Create new video question
// @Accept json
// @Produce json
// @Param payload body CreateVideoQuestionBody true "CreateVideoQuestionBody"
// @Success 200 {object} Response[CreateVideoQuestionResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.createVideoQuestion [post]
func (q VideoQuestionHandler) CreateVideoQuestion(c *fiber.Ctx) error {
	body := CreateVideoQuestionBody{}

	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return err
	}

	response, err := q.videoQuestionService.CreateVideoQuestion(domains.VideoQuestion{
		Title:         body.Title,
		TimeToPrepare: body.TimeToPrepare,
		TimeToAnswer:  body.TimeToAnswer,
		TotalAttempt:  body.TotalAttempt,
		PortalID:      body.PortalID,
	})

	if err != nil {
		return err
	}

	return Created(c, CreateVideoQuestionResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		TotalAttempt:  response.TotalAttempt,
		PortalID:      response.PortalID,
		CreatedAt:     response.CreatedAt,
		UpdatedAt:     response.UpdatedAt,
	})
}

// GetVideoQuestionById
// @ID getVideoQuestionById
// @Tags videoQuestion
// @Summary Get video question by id
// @Accept json
// @Produce json
// @Param payload query GetVideoQuestionByIdParam true "Video question ID"
// @Success 200 {object} Response[GetVideoQuestionByIdResponse]
// @Failure 400 {object} ErrResponse
// @Failure 404 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.getVideoQuestionById [get]
func (q VideoQuestionHandler) GetVideoQuestionById(c *fiber.Ctx) error {
	param := GetVideoQuestionByIdParam{}
	if err := c.QueryParser(&param); err != nil {
		return err
	}
	if err := validate.Struct(param); err != nil {
		return err
	}

	response, err := q.videoQuestionService.GetVideoQuestionById(param.ID)
	if err != nil {
		return err
	}

	return Ok(c, GetVideoQuestionByIdResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		TotalAttempt:  response.TotalAttempt,
		PortalID:      response.PortalID,
		CreatedAt:     response.CreatedAt,
		UpdatedAt:     response.UpdatedAt,
	})
}

// GetVideoQuestionByPortalId
// @ID getVideoQuestionByPortalId
// @Tags videoQuestion
// @Summary Get video question by portal id
// @Accept json
// @Produce json
// @Param payload query GetVideoQuestionByPortalIdParam true "Portal ID"
// @Success 200 {object} Response[[]GetVideoQuestionByPortalIdResponse]
// @Failure 400 {object} ErrResponse
// @Failure 404 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.getVideoQuestionByPortalId [get]
func (q VideoQuestionHandler) GetVideoQuestionByPortalId(c *fiber.Ctx) error {
	var param GetVideoQuestionByPortalIdParam
	if err := c.QueryParser(&param); err != nil {
		return err
	}
	if err := validate.Struct(param); err != nil {
		return err
	}

	response, err := q.videoQuestionService.GetVideoQuestionByPortalId(param.ID)
	if err != nil {
		return err
	}

	var result []GetVideoQuestionByPortalIdResponse
	for _, v := range response {
		result = append(result, GetVideoQuestionByPortalIdResponse{
			ID:            v.ID,
			Title:         v.Title,
			TimeToPrepare: v.TimeToPrepare,
			TimeToAnswer:  v.TimeToAnswer,
			TotalAttempt:  v.TotalAttempt,
			PortalID:      v.PortalID,
			CreatedAt:     v.CreatedAt,
			UpdatedAt:     v.UpdatedAt,
		})
	}

	return Ok(c, result)
}

// UpdateVideoQuestion
// @ID updateVideoQuestion
// @Tags videoQuestion
// @Summary Update video question
// @Accept json
// @Produce json
// @Param payload body UpdateVideoQuestionBody true "UpdateVideoQuestionBody"
// @Success 200 {object} Response[CreateVideoQuestionResponse]
// @Failure 400 {object} ErrResponse
// @Failure 404 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.updateVideoQuestion [post]
func (q VideoQuestionHandler) UpdateVideoQuestion(c *fiber.Ctx) error {
	body := UpdateVideoQuestionBody{}

	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return err
	}

	response, err := q.videoQuestionService.UpdateVideoQuestion(domains.VideoQuestion{
		ID:            body.QuestionID,
		Title:         body.Title,
		TimeToPrepare: body.TimeToPrepare,
		TimeToAnswer:  body.TimeToAnswer,
		TotalAttempt:  body.TotalAttempt,
		PortalID:      body.PortalID,
	})

	if err != nil {
		return err
	}

	return Ok(c, CreateVideoQuestionResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		TotalAttempt:  response.TotalAttempt,
		PortalID:      response.PortalID,
		CreatedAt:     response.CreatedAt,
		UpdatedAt:     response.UpdatedAt,
	})
}

// DeleteVideoQuestion
// @ID deleteVideoQuestionById
// @Tags videoQuestion
// @Summary Delete video question by id
// @Accept json
// @Produce json
// @Param payload query GetVideoQuestionByIdParam true "Video question ID"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 404 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.deleteVideoQuestionById [post]
func (q VideoQuestionHandler) DeleteVideoQuestion(c *fiber.Ctx) error {
	body := DeleteVideoQuestionByIdBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}
	if err := validate.Struct(body); err != nil {
		return err
	}

	err := q.videoQuestionService.DeleteVideoQuestionById(body.ID)
	if err != nil {
		return err
	}

	return Ok(c, "Deleted successfully")
}
