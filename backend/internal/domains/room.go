package domains

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Room struct {
	ID           string `gorm:"primaryKey"`
	CandidateID  uint
	WorkspaceID  uint
	IsVideoDone  *bool
	IsCodingDone *bool
	DueDate      time.Time
	gorm.Model
}

func (r *Room) BeforeCreate(tx *gorm.DB) (err error) {
	r.ID = uuid.New().String()
	return
}
