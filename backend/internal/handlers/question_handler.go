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

	response, err := q.videoQuestionService.CreateQuestion(domains.VideoQuestion{
		Title:         body.Title,
		TimeToPrepare: body.TimeToPrepare,
		TimeToAnswer:  body.TimeToAnswer,
		RetryAmount:   body.RetryAmount,
		WorkspaceID:   body.WorkspaceID,
	})

	if err != nil {
		return err
	}

	return Created(c, CreateVideoQuestionResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		RetryAmount:   response.RetryAmount,
		WorkspaceID:   response.WorkspaceID,
		CreatedAt:     response.CreatedAt,
		UpdatedAt:     response.UpdatedAt,
	})
}

// GetVideoQuestion
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
// @Router /videoQuestion.getVideoQuestionById/{id} [get]
func (q VideoQuestionHandler) GetVideoQuestion(c *fiber.Ctx) error {
	param := GetVideoQuestionByIdParam{}
	if err := c.QueryParser(&param); err != nil {
		return err
	}
	if err := validate.Struct(param); err != nil {
		return err
	}

	response, err := q.videoQuestionService.GetQuestionById(param.ID)
	if err != nil {
		return err
	}

	return Ok(c, GetVideoQuestionByIdResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		RetryAmount:   response.RetryAmount,
		WorkspaceID:   response.WorkspaceID,
		CreatedAt:     response.CreatedAt,
		UpdatedAt:     response.UpdatedAt,
	})
}

// GetVideoQuestionByWorkspaceId
// @ID getVideoQuestionByWorkspaceId
// @Tags videoQuestion
// @Summary Get video question by workspace id
// @Accept json
// @Produce json
// @Param payload query GetVideoQuestionByWorkspaceIdParam true "Workspace ID"
// @Success 200 {array} Response[[]GetVideoQuestionByIdResponse]
// @Failure 400 {object} ErrResponse
// @Failure 404 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /videoQuestion.getVideoQuestionWorkspaceIdId/{id} [get]
func (q VideoQuestionHandler) GetVideoQuestionByWorkspaceId(c *fiber.Ctx) error {
	var param GetVideoQuestionByWorkspaceIdParam
	if err := c.QueryParser(&param); err != nil {
		return err
	}
	if err := validate.Struct(param); err != nil {
		return err
	}

	response, err := q.videoQuestionService.GetQuestionByWorkspaceId(param.ID)
	if err != nil {
		return err
	}

	return Ok(c, response)
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

	response, err := q.videoQuestionService.UpdateQuestion(domains.VideoQuestion{
		ID:            body.ID,
		Title:         body.Title,
		TimeToPrepare: body.TimeToPrepare,
		TimeToAnswer:  body.TimeToAnswer,
		RetryAmount:   body.RetryAmount,
		WorkspaceID:   body.WorkspaceID,
	})

	if err != nil {
		return err
	}

	return Ok(c, CreateVideoQuestionResponse{
		ID:            response.ID,
		Title:         response.Title,
		TimeToPrepare: response.TimeToPrepare,
		TimeToAnswer:  response.TimeToAnswer,
		RetryAmount:   response.RetryAmount,
		WorkspaceID:   response.WorkspaceID,
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

	err := q.videoQuestionService.DeleteQuestionById(body.ID)
	if err != nil {
		return err
	}

	return Ok(c, "Deleted successfully")
}
