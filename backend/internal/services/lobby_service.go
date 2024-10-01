package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorGetRoomContext = fiber.NewError(fiber.StatusInternalServerError, "error getting room context")
)

type IRoomService interface {
	GetRoomContext(roomId uint) (*domains.Room, error)
	UpdateRoomContext(room domains.Room) error
}

type roomService struct {
	roomRepo repositories.IRoomRepository
}

func NewRoomService(roomRepo repositories.IRoomRepository) IRoomService {
	return &roomService{
		roomRepo: roomRepo,
	}
}

func (l roomService) GetRoomContext(roomId uint) (*domains.Room, error) {
	room, err := l.roomRepo.GetById(roomId)
	if err != nil {
		return nil, ErrorGetRoomContext
	}

	return room, nil
}

func (l roomService) UpdateRoomContext(room domains.Room) error {
	if err := l.roomRepo.Update(room); err != nil {
		return err
	}

	return nil
}
