package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorWorkspaceExists = fiber.NewError(fiber.StatusBadRequest, "workspace already exists")
	ErrorUserInWorkspace = fiber.NewError(fiber.StatusBadRequest, "user alreadt in workspace")
)

type IWorkspaceService interface {
	GetWorkspaceById(id uint) (workspace *domains.Workspace, userInworkspace *[]domains.UserInWorkspace, userData *[]domains.User, err error)
	GetPortalWorkspace(portalId *uint) (workspace *[]domains.Workspace, err error)
	GetUserNumInWorkspace(protalId *uint) (workspace []uint, err error)
	Create(title string, startDate string, endDate string, isVideo *bool, isCoding *bool, codingTime uint, reqScreen *bool, reqMicrophone *bool, reqCamera *bool, portalId uint) (workspace *domains.Workspace, err error)
	Delete(id uint) (err error)

	GetUserInWorkspace(workspaceId uint) (listUser *[]domains.UserInWorkspace, err error)
	DeleteUserInWorkspace(userId uint, workspaceId uint) (err error)
}
