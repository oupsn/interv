package domains

import (
	"time"

	"gorm.io/gorm"
)

type Plagarism struct {
	Id             uint      `gorm:"primaryKey" json:"id"`
	WorkspaceID    uint      `gorm:"not null" json:"workspace_id"`
	SourceUser     uint      `gorm:"not null" json:"source_user"`
	SourceUserName string    `gorm:"not null" json:"source_user_name"`
	SourceRoomID   string    `gorm:"not null" json:"source_room_id"`
	TargetUser     uint      `gorm:"not null" json:"target_user"`
	TargetUserName string    `gorm:"not null" json:"target_user_name"`
	TargetRoomID   string    `gorm:"not null" json:"target_room_id"`
	SourceCode     string    `gorm:"not null" json:"source_code"`
	TargetCode     string    `gorm:"not null" json:"target_code"`
	QuestionTitle  string    `gorm:"not null" json:"question_title"`
	Score          float64   `gorm:"not null" json:"score"`
	Diff           string    `gorm:"not null" json:"diff"`
	CreatedAt      time.Time `gorm:"not null" json:"created_at"`
	UpdatedAt      time.Time `gorm:"not null" json:"updated_at"`
	gorm.Model
}
