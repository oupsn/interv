package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type IWorkspaceRepository interface {
	Create(workspace domains.Workspace) (newWorkspace *domains.Workspace, err error)
	FindByTitle(title string) (workspace *domains.Workspace, err error)
	FindById(id uint) (workspace *domains.Workspace, err error)
	FindByPortalId(portal_id *uint) (workspace *[]domains.Workspace, err error)
	FindWorkspaceIdByPortalId(portal_id *uint) (workspace *[]uint, err error)
	DeleteById(id uint) (err error)
}
