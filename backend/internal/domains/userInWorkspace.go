package domains

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type StatusType string

const (
	StatusUnseen  = "unseen"
	StatusPending = "pending"
	StatusSuccess = "success"
)

type UserInWorkspace struct {
	Id          uint `gorm:"primaryKey"`
	UserId      uint
	WorkspaceId uint
	User        User       `gorm:"foreignKey:UserId"`
	Workspace   Workspace  `gorm:"foreignKey:WorkspaceId"`
	Status      StatusType `gorm:"default: unseen"`
	IsInterest  *bool      `gorm:"default:false"`
	gorm.Model
}

func (UserInWorkspace *UserInWorkspace) BeforeCreate(tx *gorm.DB) (err error) {
	validModes := []StatusType{StatusUnseen, StatusPending, StatusSuccess}
	for _, validMode := range validModes {
		if UserInWorkspace.Status == validMode {
			return nil
		}
	}
	return fiber.NewError(fiber.StatusBadRequest, "invalid status , must be one of: "+StatusUnseen+", "+StatusPending+", "+StatusSuccess)
}
