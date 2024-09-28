package services

import (
	"strings"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type workspaceService struct {
	workspaceRepository       repositories.IWorkspaceRepository
	userInWorkspaceRepository repositories.IUserInWorkspaceRepository
	userRepository            repositories.IUserRepository
	userInPortalService       IUserInPortalService
}

func NewWorkspaceService(workspaceRepository repositories.IWorkspaceRepository, userInWorkspaceRepository repositories.IUserInWorkspaceRepository, userRepository repositories.IUserRepository, userInPortalService IUserInPortalService) IWorkspaceService {
	return &workspaceService{
		userInWorkspaceRepository: userInWorkspaceRepository,
		workspaceRepository:       workspaceRepository,
		userRepository:            userRepository,
		userInPortalService:       userInPortalService,
	}
}

func (w *workspaceService) GetWorkspaceById(id uint) (workspace *domains.Workspace, userInWorkspace *[]domains.UserInWorkspace, userData *[]domains.User, err error) {
	workspace, err = w.workspaceRepository.FindById(id)
	if err != nil {
		return nil, nil, nil, err
	}
	userInWorkspace, err = w.userInWorkspaceRepository.FindByWorkspaceId(id)
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
	return w.userInWorkspaceRepository.FindByWorkspaceId(id)
}

func (w *workspaceService) GetAllOwnWorkspace(portalId *uint) (workspace *[]domains.Workspace, err error) {
	return w.workspaceRepository.FindByPortalId(portalId)
}

func (w *workspaceService) GetUserNumInWorkspace(portalId *uint) (workspaceId []uint, err error) {
	listOfWorkspace, err := w.workspaceRepository.FindWorkspaceIdByPortalId(portalId)
	if err != nil {
		return nil, err
	}

	var userWorkspace []uint
	for _, uw := range *listOfWorkspace {
		numberOfUser, err := w.userInWorkspaceRepository.GetUserNumberInWorkspace(uw)
		if err != nil {
			return nil, err
		}
		userWorkspace = append(userWorkspace, uint(numberOfUser))
	}

	return userWorkspace, nil
}

func (w *workspaceService) Create(title string, isCoding *bool, isVideo *bool, startDate time.Time, stopDate time.Time, userId *uint) (workspace *domains.Workspace, err error) {

	if _, err := w.workspaceRepository.FindByTitle(strings.TrimSpace(title)); err == nil {
		return nil, ErrorWorkspaceExists
	}
	portalId, err := w.userInPortalService.GetPortalByUserId(*userId)

	return w.workspaceRepository.Create(domains.Workspace{
		Title:     strings.TrimSpace(title),
		IsVideo:   isVideo,
		IsCoding:  isCoding,
		StartDate: startDate,
		StopDate:  stopDate,
		PortalId:  portalId,
	})
}

func (w *workspaceService) Delete(id uint) (err error) {
	return w.workspaceRepository.DeleteById(id)
}

func (w *workspaceService) DeleteUserInWorkspace(userId uint, workspaceId uint) (err error) {
	return w.userInWorkspaceRepository.DeleteByUserIdAndWorkspaceId(userId, workspaceId)
}
