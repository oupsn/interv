package domains

import (
	"gorm.io/gorm"
)

type Portal struct {
	Id          uint   `gorm:"primaryKey"`
	CompanyName string `gorm:"unique"`
	gorm.Model
}
