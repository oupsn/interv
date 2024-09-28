package services

import (
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorInvalidCredentials = fiber.NewError(fiber.StatusBadRequest, "invalid credentials")
	ErrorAuthFailed         = fiber.NewError(fiber.StatusInternalServerError, "authentication failed")
	ErrorUserNotFound       = fiber.NewError(fiber.StatusNotFound, "user not found")
)

type IAuthService interface {
	Login(username string, password string) (userId *uint, accessToken *string, err error)
	Me(userId uint) (user *domains.User, portalId *uint, err error)
	GenerateJwtToken(userId uint, username string, expiration time.Time) (string, error)
}
