package domains

import (
	"time"
)

var (
	UserRoleCandidate = "candidate"
	UserRoleAdmin     = "admin"
)

type User struct {
	ID        *uint   `gorm:"primaryKey"`
	Username  *string `gorm:"unique"`
	Password  *string
	Role      *string `gorm:"default:'general_user'"`
	CreatedAt *time.Time
	UpdatedAt *time.Time
}