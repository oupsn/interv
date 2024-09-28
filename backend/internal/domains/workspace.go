package domains

import (
	"time"

	"gorm.io/gorm"
)

type Workspace struct {
	Id        uint   `gorm:"primaryKey"`
	Title     string `gorm:"unique"`
	IsVideo   *bool
	IsCoding  *bool
	StartDate time.Time
	StopDate  time.Time
	PortalId  uint
	gorm.Model
}
