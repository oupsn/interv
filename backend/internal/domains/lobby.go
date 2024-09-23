package domains

import (
	"gorm.io/gorm"
	"time"
)

type Lobby struct {
	ID                  uint `gorm:"primaryKey"`
	UserID              uint
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
