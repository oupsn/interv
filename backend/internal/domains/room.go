package domains

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Room struct {
	ID           string `gorm:"primaryKey"`
	CandidateID  uint
	WorkspaceID  uint
	IsVideoDone  *bool
	IsCodingDone *bool
	Workspace    Workspace `gorm:"foreignKey:WorkspaceID"`
	Candidate    User      `gorm:"foreignKey:CandidateID"`
	gorm.Model
}

func (r *Room) BeforeCreate(tx *gorm.DB) (err error) {
	r.ID = uuid.New().String()
	return
}
