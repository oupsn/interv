package domains

import (
	"gorm.io/gorm"
)

type VideoQuestion struct {
	ID            uint `gorm:"primaryKey"`
	PortalID      uint
	Title         string
	TimeToPrepare uint
	TimeToAnswer  uint
	TotalAttempt  uint
	Workspace     []*Workspace `gorm:"many2many:videoQuestion_workspace"`
	gorm.Model
}
