package repositories

import (
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

func (uiw *userInWorkspaceRepository) GetUserNumberInWorkspace(workspaceId uint) (userNum int64, err error) {
	if err := uiw.DB.Model(&domains.UserInWorkspace{}).Where("workspace_id = ?", workspaceId).Count(&userNum).Error; err != nil {
		return 0, err
	}
	return userNum, nil
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
	if err := uiw.DB.Find(&foundUserInWorkspace, "workspace_id = ?", workspaceId).Error; err != nil {
		return nil, err
	}
	return foundUserInWorkspace, nil
}

func (uiw *userInWorkspaceRepository) FindByUserIdAndWorkspaceId(userId uint, workspaceId uint) (userInWorkspace *domains.UserInWorkspace, err error) {
	foundUserInWorkspace := new(domains.UserInWorkspace)
	if err := uiw.DB.First(&foundUserInWorkspace, "user_id = ? AND workspace_id", userId, workspaceId).Error; err != nil {
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
