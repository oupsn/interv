package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type LobbyHandler struct {
	lobbyService services.ILobbyService
}

func NewLobbyHandler(lobbyService services.ILobbyService) LobbyHandler {
	return LobbyHandler{
		lobbyService: lobbyService,
	}
}

// GetLobbyContext
// @ID getLobbyContext
// @Tags lobby
// @Summary Get lobby context
// @Accept json
// @Produce json
// @Param payload query GetLobbyContextQuery true "lobby id"
// @Success 200 {object} Response[GetLobbyContextResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /lobby.getLobbyContext [get]
func (l LobbyHandler) GetLobbyContext(c *fiber.Ctx) error {
	query := GetLobbyContextQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return err
	}

	lobby, err := l.lobbyService.GetLobbyContext(query.LobbyID)
	if err != nil {
		return err
	}

	return Ok(c, GetLobbyContextResponse{
		LobbyID:             lobby.ID,
		UserID:              lobby.UserID,
		TotalVideoTime:      lobby.TotalVideoTime,
		TotalCodingTime:     lobby.TotalCodingTime,
		TotalVideoQuestion:  lobby.TotalVideoQuestion,
		TotalCodingQuestion: lobby.TotalCodingQuestion,
		IsVideoDone:         lobby.IsVideoDone,
		IsCodingDone:        lobby.IsCodingDone,
		DueDate:             lobby.DueDate,
	})
}

// UpdateLobbyContext
// @ID updateLobbyContext
// @Tags lobby
// @Summary Update lobby context
// @Accept json
// @Produce json
// @Param payload body UpdateLobbyContextBody true "update lobby context"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /lobby.updateLobbyContext [post]
func (l LobbyHandler) UpdateLobbyContext(c *fiber.Ctx) error {
	body := UpdateLobbyContextBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return err
	}

	err := l.lobbyService.UpdateLobbyContext(domains.Lobby{
		ID:                  body.LobbyID,
		UserID:              body.UserID,
		TotalVideoTime:      body.TotalVideoTime,
		TotalCodingTime:     body.TotalCodingTime,
		TotalVideoQuestion:  body.TotalVideoQuestion,
		TotalCodingQuestion: body.TotalCodingQuestion,
		IsVideoDone:         body.IsVideoDone,
		IsCodingDone:        body.IsCodingDone,
		DueDate:             body.DueDate,
	})
	if err != nil {
		return err
	}

	return Ok(c, "lobby context updated")
}
