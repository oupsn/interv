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
	RetryAmount   uint
	gorm.Model
}
