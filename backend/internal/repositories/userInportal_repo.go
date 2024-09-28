package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type IUserInPortalRepository interface {
	Create(portal domains.UserInPortal) (newPortal *domains.UserInPortal, err error)
	FindByPortalId(id uint) (userInPortal *[]domains.UserInPortal, err error)
	FindByUserId(id uint) (userInPortal *domains.UserInPortal, err error)
	FindByUserAndPortalId(userId uint, portalId uint) (userInPortal *domains.UserInPortal, err error)
	DeleteById(id uint) (err error)
}

type userInPortalRepository struct {
	DB gorm.DB
}

func NewUserInPortalRepository(db gorm.DB) IUserInPortalRepository {
	return &userInPortalRepository{
		DB: db,
	}
}

func (uip *userInPortalRepository) Create(userInPortal domains.UserInPortal) (newUserInPortal *domains.UserInPortal, err error) {

	if err := uip.DB.Clauses(clause.Returning{}).Create(&userInPortal).Error; err != nil {
		return nil, err
	}

	return &userInPortal, nil
}

func (uip *userInPortalRepository) FindByPortalId(id uint) (userInPortal *[]domains.UserInPortal, err error) {
	foundUserInPortal := new([]domains.UserInPortal)
	if err := uip.DB.Find(&foundUserInPortal, "portal_id = ? ", id).Error; err != nil {
		return nil, err
	}
	return foundUserInPortal, nil
}

func (uip *userInPortalRepository) FindByUserId(id uint) (userInPortal *domains.UserInPortal, err error) {
	foundUserInPortal := new(domains.UserInPortal)

	if err := uip.DB.First(&foundUserInPortal, "user_id = ?", id).Error; err != nil {
		return nil, err
	}

	return foundUserInPortal, nil
}

func (uip *userInPortalRepository) FindByUserAndPortalId(userId uint, portalId uint) (userInPortal *domains.UserInPortal, err error) {
	foundUserInPortal := new(domains.UserInPortal)

	if err := uip.DB.First(&foundUserInPortal, "user_id = ? AND portal_id", userId, portalId).Error; err != nil {
		return nil, err
	}
	return foundUserInPortal, nil
}

func (uip *userInPortalRepository) DeleteById(id uint) (err error) {
	if err := uip.DB.Delete(&domains.UserInPortal{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}
