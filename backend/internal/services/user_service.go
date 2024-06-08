package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrInvalidRole       = fiber.NewError(fiber.StatusBadRequest, "invalid role specified")
	ErrUserAlreadyExists = fiber.NewError(fiber.StatusBadRequest, "user already exists")
)

type UserService interface {
	Create(username string, password string, role string, department string) (user *domains.User, err error)
	Delete(id uint) (err error)
}
