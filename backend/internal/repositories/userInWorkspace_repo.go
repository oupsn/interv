package repositories

import (
	"fmt"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type userInWorkspaceRepository struct {
	DB gorm.DB
}

func NewUserInWorkspaceRepository(db gorm.DB) IUserInWorkspaceRepository {
	return &userInWorkspaceRepository{
		DB: db,
	}
}

func (uiw *userInWorkspaceRepository) Create(userInWorkspace []*domains.UserInWorkspace) (newUserInWorkspace []*domains.UserInWorkspace, err error) {
	if err := uiw.DB.Clauses(clause.Returning{}).Create(&userInWorkspace).Error; err != nil {
		return nil, err
	}

	return userInWorkspace, nil
}

func (uiw *userInWorkspaceRepository) GetUnseenCandidate(workspaceId uint) (err error) {
	foundUserInWorkspace := new([]domains.UserInWorkspace)
	if err := uiw.DB.Find(&foundUserInWorkspace, "workspace_id = ?", workspaceId).Error; err != nil {
		return err
	}
	for _, data := range *foundUserInWorkspace {

		if err := uiw.DB.Model(domains.UserInWorkspace{}).Where("workspace_id = ? AND status = ?", data.WorkspaceId, "idle").Update("status", "unseen").Error; err != nil {
			return err
		}
	}
	return nil
}

func (uiw *userInWorkspaceRepository) InterestUser(workspaceId uint, candidateId uint, interest *bool) error {
	foundUserInWorkspace := new(domains.UserInWorkspace)
	result := uiw.DB.Model(&foundUserInWorkspace).Where("workspace_id = ? AND user_id = ?", workspaceId, candidateId).Update("is_interest", !*interest)
	if result.Error != nil {

		return result.Error
	}
	fmt.Print(interest)
	return nil
}

func (uiw *userInWorkspaceRepository) FindByUserId(userId uint) (userInWorkspace *[]domains.UserInWorkspace, err error) {
	foundUserInWorkspace := new([]domains.UserInWorkspace)
	if err := uiw.DB.Find(&foundUserInWorkspace, "user_id = ?", userId).Error; err != nil {
		return nil, err
	}
	return foundUserInWorkspace, nil
}

func (uiw *userInWorkspaceRepository) FindByWorkspaceId(workspaceId uint) (userInWorkspace *[]domains.UserInWorkspace, err error) {
	foundUserInWorkspace := new([]domains.UserInWorkspace)
	if err := uiw.DB.Distinct("user_in_workspaces.*").
		Joins("JOIN users ON user_in_workspaces.user_id = users.id").
		Order("user_id").
		Preload("User").
		Find(&foundUserInWorkspace, "workspace_id = ?", workspaceId).Error; err != nil {
		return nil, err
	}
	return foundUserInWorkspace, nil
}

func (uiw *userInWorkspaceRepository) FindByUserIdAndWorkspaceId(userId uint, workspaceId uint) (userInWorkspace *domains.UserInWorkspace, err error) {
	foundUserInWorkspace := new(domains.UserInWorkspace)
	if err := uiw.DB.Distinct("user_in_workspaces.*").
		Joins("JOIN users ON user_in_workspaces.user_id = users.id").
		Preload("User").
		First(&foundUserInWorkspace, "user_id = ? AND workspace_id = ?", userId, workspaceId).Error; err != nil {
		return nil, err
	}
	return foundUserInWorkspace, nil
}

func (uiw *userInWorkspaceRepository) DeleteById(id uint) (err error) {
	if err := uiw.DB.Delete(&domains.UserInWorkspace{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}

func (uiw *userInWorkspaceRepository) DeleteByUserId(userId uint) (err error) {
	if err := uiw.DB.Delete(&domains.UserInWorkspace{}, "user_id = ?", userId).Error; err != nil {
		return err
	}
	return nil
}

func (uiw *userInWorkspaceRepository) DeleteByWorkspaceId(workspaceId uint) (err error) {
	if err := uiw.DB.Delete(&domains.UserInWorkspace{}, "workspace_id = ?", workspaceId).Error; err != nil {
		return err
	}
	return nil
}

func (uiw *userInWorkspaceRepository) DeleteByUserIdAndWorkspaceId(userId uint, workspaceId uint) (err error) {
	if err := uiw.DB.Delete(&domains.UserInWorkspace{}, "user_id = ? AND workspace_id = ?", userId, workspaceId).Error; err != nil {
		return err
	}
	return nil
}
