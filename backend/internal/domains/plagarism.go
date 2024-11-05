package domains

import (
	"time"

	"gorm.io/gorm"
)

type Plagarism struct {
	Id             uint    `gorm:"primaryKey"`
	WorkspaceID    uint    `gorm:"not null"`
	SourceUser     uint    `gorm:"not null"`
	SourceUserName string  `gorm:"not null"`
	SourceRoomID   string  `gorm:"not null"`
	TargetUser     uint    `gorm:"not null"`
	TargetUserName string  `gorm:"not null"`
	TargetRoomID   string  `gorm:"not null"`
	SourceCode     string  `gorm:"not null"`
	TargetCode     string  `gorm:"not null"`
	QuestionTitle  string  `gorm:"not null"`
	Score          float64 `gorm:"not null"`
	Diff           string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	gorm.Model
}
