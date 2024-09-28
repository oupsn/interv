package domains

import (
	"gorm.io/gorm"
)

type UserInPortal struct {
	Id       uint `gorm:"primaryKey"`
	PortalId uint
	UserId   uint
	User     User   `gorm:"foreignKey:UserId"`
	Portal   Portal `gorm:"foreignKey:PortalId"`
	gorm.Model
}
