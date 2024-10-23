package domains

import (
	"gorm.io/gorm"
)

type VideoQuestionSnapshot struct {
	ID              uint `gorm:"primaryKey"`
	RoomID          string
	CandidateID     uint
	VideoQuestionID uint
	FileName        string
	VideoQuestion   VideoQuestion `gorm:"foreignKey:VideoQuestionID"`
	gorm.Model
}
