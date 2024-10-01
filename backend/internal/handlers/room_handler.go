package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type RoomHandler struct {
	roomService services.IRoomService
}

func NewRoomHandler(roomService services.IRoomService) RoomHandler {
	return RoomHandler{
		roomService: roomService,
	}
}

// GetRoomContext
// @ID getRoomContext
// @Tags room
// @Summary Get room context
// @Accept json
// @Produce json
// @Param payload query GetRoomContextQuery true "room id"
// @Success 200 {object} Response[GetRoomContextResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /room.getRoomContext [get]
func (l RoomHandler) GetRoomContext(c *fiber.Ctx) error {
	query := GetRoomContextQuery{}
	if err := c.QueryParser(&query); err != nil {
		return err
	}

	if err := validate.Struct(query); err != nil {
		return err
	}

	room, err := l.roomService.GetRoomContext(query.RoomID)
	if err != nil {
		return err
	}

	return Ok(c, GetRoomContextResponse{
		RoomID:              room.ID,
		CandidateID:         room.CandidateID,
		TotalVideoTime:      room.TotalVideoTime,
		TotalCodingTime:     room.TotalCodingTime,
		TotalVideoQuestion:  room.TotalVideoQuestion,
		TotalCodingQuestion: room.TotalCodingQuestion,
		IsVideoDone:         room.IsVideoDone,
		IsCodingDone:        room.IsCodingDone,
		DueDate:             room.DueDate,
	})
}

// UpdateRoomContext
// @ID updateRoomContext
// @Tags room
// @Summary Update room context
// @Accept json
// @Produce json
// @Param payload body UpdateRoomContextBody true "update room context"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /room.updateRoomContext [post]
func (l RoomHandler) UpdateRoomContext(c *fiber.Ctx) error {
	body := UpdateRoomContextBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return err
	}

	err := l.roomService.UpdateRoomContext(domains.Room{
		ID:                  body.RoomID,
		CandidateID:         body.CandidateID,
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

	return Ok(c, "room context updated")
}
