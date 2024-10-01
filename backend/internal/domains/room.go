package domains

import (
	"gorm.io/gorm"
	"time"
)

type Room struct {
	ID                  uint `gorm:"primaryKey"`
	CandidateID         uint
	WorkspaceID         uint
	TotalVideoTime      uint
	TotalCodingTime     uint
	TotalVideoQuestion  uint
	TotalCodingQuestion uint
	IsVideoDone         bool
	IsCodingDone        bool
	DueDate             time.Time
	gorm.Model
}
