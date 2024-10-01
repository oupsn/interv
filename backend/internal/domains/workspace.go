package domains

import (
	"time"

	"gorm.io/gorm"
)

type Workspace struct {
	Id            uint   `gorm:"primaryKey"`
	Title         string `gorm:"unique"`
	IsVideo       *bool
	IsCoding      *bool
	StartDate     time.Time
	StopDate      time.Time
	PortalId      uint
	VideoQuestion []*VideoQuestion `gorm:"many2many:videoQuestion_workspace"`
	gorm.Model
}
