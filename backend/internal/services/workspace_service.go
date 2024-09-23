package services

import (
	"strings"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type workspaceService struct {
	workspaceReposity       repositories.IWorkspaceRepository
	userInWorkspaceReposity repositories.IUserInWorkspaceRepository
	userRepository          repositories.IUserRepository
}

func NewWorkspaceService(workspaceReposity repositories.IWorkspaceRepository, userInWorkspaceReposity repositories.IUserInWorkspaceRepository, userRepository repositories.IUserRepository) IWorkspaceService {
	return &workspaceService{
		userInWorkspaceReposity: userInWorkspaceReposity,
		workspaceReposity:       workspaceReposity,
		userRepository:          userRepository,
	}
}

func (w *workspaceService) GetWorkspaceById(id uint) (workspace *domains.Workspace, userInWorkspace *[]domains.UserInWorkspace, userData *[]domains.User, err error) {
	workspace, err = w.workspaceReposity.FindById(id)
	if err != nil {
		return nil, nil, nil, err
	}
	userInWorkspace, err = w.userInWorkspaceReposity.FindByWorkspaceId(id)
	if err != nil {
		return nil, nil, nil, err
	}

	ids := make([]uint, len(*userInWorkspace))
	for i, user := range *userInWorkspace {
		ids[i] = user.UserId
	}

	userData, err = w.userRepository.FindAllByIds(ids)

	return workspace, userInWorkspace, userData, nil
}

func (w *workspaceService) GetUserInWorkspace(id uint) (workspace *[]domains.UserInWorkspace, err error) {
	return w.userInWorkspaceReposity.FindByWorkspaceId(id)
}

func (w *workspaceService) GetAllOwnWorkspace(ownerId *uint) (workspace *[]domains.Workspace, err error) {
	return w.workspaceReposity.FindByOwner(ownerId)
}

func (w *workspaceService) GetUserNumInWorkspace(ownerId *uint) (workspaceId []uint, err error) {
	listOfWorkspace, err := w.workspaceReposity.FindWorkspaceIdByOwner(ownerId)
	if err != nil {
		return nil, err
	}

	var userWorkspace []uint
	for _, uw := range *listOfWorkspace {
		numberOfUser, err := w.userInWorkspaceReposity.GetUserNumberInWorkspace(uw)
		if err != nil {
			return nil, err
		}
		userWorkspace = append(userWorkspace, uint(numberOfUser))
	}

	return userWorkspace, nil
}

func (w *workspaceService) Create(title string, isCoding *bool, isVideo *bool, startDate time.Time, stopDate time.Time, owner *uint) (workspace *domains.Workspace, err error) {

	if _, err := w.workspaceReposity.FindByTitle(strings.TrimSpace(title)); err == nil {
		return nil, ErrorWorkspaceExists
	}

	return w.workspaceReposity.Create(domains.Workspace{
		Title:     strings.TrimSpace(title),
		IsVideo:   isVideo,
		IsCoding:  isCoding,
		StartDate: startDate,
		StopDate:  stopDate,
		Owner:     *owner,
	})
}

func (w *workspaceService) Delete(id uint) (err error) {
	return w.workspaceReposity.DeleteById(id)
}

func (w *workspaceService) DeleteUserInWorkspace(userId uint, workspaceId uint) (err error) {
	return w.userInWorkspaceReposity.DeleteByUserIdAndWorkspaceId(userId, workspaceId)
}
