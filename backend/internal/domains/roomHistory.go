package domains

import (
	"gorm.io/gorm"
	"time"
)

type RoomHistory struct {
	ID               uint `gorm:"primaryKey"`
	RoomID           string
	VideoQuestionID  uint
	StartAnswerTime  *time.Time
	StartPrepareTime time.Time
	AttemptNo        int
	Room             Room          `gorm:"foreignKey:RoomID"`
	VideoQuestion    VideoQuestion `gorm:"foreignKey:VideoQuestionID"`
	gorm.Model
}
