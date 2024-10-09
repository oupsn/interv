package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/cryptone"
	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
	"time"
)

type RoomHandler struct {
	roomService services.IRoomService
}

func NewRoomHandler(roomService services.IRoomService) RoomHandler {
	return RoomHandler{
		roomService: roomService,
	}
}

// CreateRoom
// @ID createRoom
// @Tags room
// @Summary Create room
// @Accept json
// @Produce json
// @Param payload body CreateRoomBody true "create room"
// @Success 200 {object} Response[CreateRoomResponse]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /room.createRoom [post]
func (l RoomHandler) CreateRoom(c *fiber.Ctx) error {
	body := CreateRoomBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return err
	}

	room, _, err := l.roomService.CreateRoom(domains.Room{
		CandidateID: body.CandidateID,
		WorkspaceID: body.WorkspaceID,
	})
	if err != nil {
		return err
	}

	return Ok(c, CreateRoomResponse{
		RoomID:      room.ID,
		CandidateID: room.CandidateID,
	})
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

	room, candidate, videoLength, videoQuestionTotalTime, codingLength, codingQuestionTotalTime, rt, dueDate, err := l.roomService.GetRoomContext(query.RoomID, query.Rt)
	if err != nil {
		return err
	}

	c.Cookie(&fiber.Cookie{
		Name:     "rt",
		Value:    rt,
		Expires:  time.Now().Add(time.Hour * 3),
		HTTPOnly: true,
		Secure:   true,
	})

	return Ok(c, GetRoomContextResponse{
		RoomID:              room.ID,
		CandidateName:       candidate.Name,
		CandidateID:         room.CandidateID,
		TotalVideoTime:      videoQuestionTotalTime,
		TotalCodingTime:     codingQuestionTotalTime,
		TotalVideoQuestion:  videoLength,
		TotalCodingQuestion: codingLength,
		IsVideoDone:         *room.IsVideoDone,
		IsCodingDone:        *room.IsCodingDone,
		DueDate:             *dueDate,
		IsOverdue:           (*dueDate).Before(time.Now()),
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
		ID:           body.RoomID,
		CandidateID:  body.CandidateID,
		IsVideoDone:  body.IsVideoDone,
		IsCodingDone: body.IsCodingDone,
	})
	if err != nil {
		return err
	}

	return Ok(c, "room context updated")
}

// CheckAuthCandidate
// @ID checkAuthCandidate
// @Tags room
// @Summary Check authentication for candidate
// @Accept json
// @Produce json
// @Param roomId query string true "room id"
// @Param rt query string true "room token"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /room.checkAuthCandidate [get]
func (l RoomHandler) CheckAuthCandidate(c *fiber.Ctx) error {
	token := c.Cookies("rt", "")
	if token == "" {
		token = c.Query("rt")
	}

	aes, err := cryptone.DecryptAES([]byte(viper.GetString("RT")), token)
	if err != nil {
		return err
	}

	if aes != c.Query("roomId") {
		return fiber.NewError(fiber.StatusUnauthorized, "unauthorized candidate")
	}

	return Ok(c, "candidate authorized")
}
