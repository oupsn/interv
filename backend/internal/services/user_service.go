package services

import (
	"strings"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	userRepository            repositories.IUserRepository
	userInWorkspaceRepository repositories.IUserInWorkspaceRepository
	portalRepository          repositories.IPortalRepository
}

func NewUserService(userRepository repositories.IUserRepository, userInWorkspaceRepository repositories.IUserInWorkspaceRepository, workspaceRepository repositories.IWorkspaceRepository) IUserService {
	return &userService{
		userRepository:            userRepository,
		userInWorkspaceRepository: userInWorkspaceRepository,
	}
}

func (u *userService) Create(importUser []domains.User, workspaceId uint) (err error) {

	defaultInterest := false
	var checkedUser []*domains.UserInWorkspace

	for x, aImportUser := range importUser {
		if err != nil {
			return err
		}
		userFound, err := u.userRepository.FindByUsername(strings.TrimSpace(importUser[x].Username))
		if err != nil {
			user, err := u.userRepository.Create(domains.User{
				ID:       aImportUser.ID,
				Name:     aImportUser.Name,
				Username: aImportUser.Username,
				Role:     aImportUser.Role,
			})
			if err != nil {
				return err
			}
			checkedUser = append(checkedUser, &domains.UserInWorkspace{
				UserId:      user.ID,
				WorkspaceId: workspaceId,
				Status:      "idle",
				IsInterest:  &defaultInterest,
			})
		} else {
			_, err := u.userInWorkspaceRepository.FindByUserIdAndWorkspaceId(userFound.ID, workspaceId)
			if err != nil {
				checkedUser = append(checkedUser, &domains.UserInWorkspace{
					UserId:      userFound.ID,
					WorkspaceId: workspaceId,
					Status:      "idle",
					IsInterest:  &defaultInterest,
				})
			}
		}
	}

	_, err = u.userInWorkspaceRepository.Create(checkedUser)
	if err == nil {
		return err
	}
	return nil
}

func (u *userService) Delete(id uint) (err error) {
	u.userInWorkspaceRepository.DeleteByUserId(id)
	return u.userRepository.DeleteById(id)
}

func (u *userService) CreateAdmin(user domains.User, portalId uint) (err error) {
	_, err = u.userRepository.FindByUsername(strings.TrimSpace(user.Username))
	if err != nil {
		bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		newUser, err := u.userRepository.Create(domains.User{
			ID:       user.ID,
			Name:     user.Name,
			Username: user.Username,
			Password: (strings.TrimSpace(string(bytes))),
			Role:     user.Role,
		})
		if err != nil {
			return err
		}
		// Find the portal by portalId
		portal, err := u.portalRepository.FindById(portalId)
		if err != nil {
			return err
		}
		err = u.portalRepository.AddUserToPortal(*newUser, *portal)
		if err != nil {
			return err
		}
	}
	return nil
}
