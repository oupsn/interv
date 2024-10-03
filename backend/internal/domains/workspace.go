package domains

import (
	"time"

	"gorm.io/gorm"
)

type Workspace struct {
	Id            uint   `gorm:"primaryKey"`
	Title         string `gorm:"unique"`
	StartDate     time.Time
	EndDate       time.Time
	IsVideo       *bool
	IsCoding      *bool
	CodingTime    uint
	ReqScreen     *bool
	ReqMicrophone *bool
	ReqCamera     *bool
	PortalId      uint
	VideoQuestion []*VideoQuestion `gorm:"many2many:videoQuestion_workspace"`
	gorm.Model
}
