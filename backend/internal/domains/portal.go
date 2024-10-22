package domains

import (
	"gorm.io/gorm"
)

type Portal struct {
	Id           uint         `gorm:"primaryKey"`
	CompanyName  string       `gorm:"unique"`
	UserInPortal []*User      `gorm:"foreignKey:PortalId"`
	Workspace    []*Workspace `gorm:"foreignKey:PortalId"`
	gorm.Model
}
