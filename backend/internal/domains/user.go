package domains

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserType string

const (
	UserRoleCandidate = "candidate"
	UserRoleAdmin     = "admin"
)

type User struct {
	ID       uint `gorm:"primaryKey"`
	Name     string
	Username string `gorm:"unique"`
	Password string
	Role     UserType `gorm:"default:'general_user'"`
	gorm.Model
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	validModes := []UserType{UserRoleCandidate, UserRoleAdmin}
	for _, validMode := range validModes {
		if user.Role == validMode {
			return nil
		}
	}
	return fiber.NewError(fiber.StatusBadRequest, "invalid role specified, must be one of: "+UserRoleCandidate+", "+UserRoleAdmin)
}
