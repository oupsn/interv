package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorGetLobbyContext = fiber.NewError(fiber.StatusInternalServerError, "error getting lobby context")
)

type ILobbyService interface {
	GetLobbyContext(lobbyId uint) (*domains.Lobby, error)
	UpdateLobbyContext(lobby domains.Lobby) error
}

type lobbyService struct {
	lobbyRepo repositories.ILobbyRepository
}

func NewLobbyService(lobbyRepo repositories.ILobbyRepository) ILobbyService {
	return &lobbyService{
		lobbyRepo: lobbyRepo,
	}
}

func (l lobbyService) GetLobbyContext(lobbyId uint) (*domains.Lobby, error) {
	lobby, err := l.lobbyRepo.GetById(lobbyId)
	if err != nil {
		return nil, ErrorGetLobbyContext
	}

	return lobby, nil
}

func (l lobbyService) UpdateLobbyContext(lobby domains.Lobby) error {
	if err := l.lobbyRepo.Update(lobby); err != nil {
		return err
	}

	return nil
}
