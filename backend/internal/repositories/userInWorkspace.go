package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type IUserInWorkspaceRepository interface {
	Create(userInWorkspace []*domains.UserInWorkspace) (newUserInWorkspace []*domains.UserInWorkspace, err error)
	FindByUserId(userId uint) (userInWorkspace *[]domains.UserInWorkspace, err error)
	FindByWorkspaceId(workspaceId uint) (userInWorkspace *[]domains.UserInWorkspace, err error)
	FindByUserIdAndWorkspaceId(userId uint, workspaceId uint) (userInWorkspace *domains.UserInWorkspace, err error)
	GetUnseenCandidate(workspaceId uint) (err error)
	InterestUser(workspaceId uint, candidateId uint, interest *bool) error
	DeleteById(id uint) (err error)
	DeleteByUserId(userId uint) (err error)
	DeleteByWorkspaceId(workspaceId uint) (err error)
	DeleteByUserIdAndWorkspaceId(userId uint, workspaceId uint) (err error)
}
