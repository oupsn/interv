package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorInvalidRole       = fiber.NewError(fiber.StatusBadRequest, "invalid role specified")
	ErrorUserAlreadyExists = fiber.NewError(fiber.StatusBadRequest, "user already exists")
)

type IUserService interface {
	Create(importUser []domains.User, workspaceId uint) (err error)
	CreateAdmin(user domains.User, portalId uint)(err error)
	Delete(id uint) (err error)
}
