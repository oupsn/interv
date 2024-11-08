package domains

import (
	"gorm.io/gorm"
	"time"
)

type RoomHistory struct {
	ID              uint `gorm:"primaryKey"`
	RoomID          string
	VideoQuestionID uint
	StartTime       time.Time
	AttemptNo       int
	Room            Room          `gorm:"foreignKey:RoomID"`
	VideoQuestion   VideoQuestion `gorm:"foreignKey:VideoQuestionID"`
	gorm.Model
}
