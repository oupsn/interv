package domains

import (
	"time"

	"gorm.io/gorm"
)

type Workspace struct {
	Id              uint   `gorm:"primaryKey"`
	Title           string `gorm:"unique"`
	StartDate       time.Time
	EndDate         time.Time
	IsVideo         *bool
	IsCoding        *bool
	VideoTime       uint
	CodingTime      uint
	ReqScreen       *bool
	ReqMicrophone   *bool
	ReqCamera       *bool
	PortalId        uint
	Portal          Portal             `gorm:"foreignKey:PortalId"`
	VideoQuestion   []*VideoQuestion   `gorm:"many2many:videoQuestion_workspace"`
	UserInWorkspace []*UserInWorkspace `gorm:"foreignKey:WorkspaceId"`
	gorm.Model
}
