package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type userRepository struct {
	DB gorm.DB
}

func NewUserRepository(db gorm.DB) IUserRepository {
	return &userRepository{
		DB: db,
	}
}

func (u *userRepository) Create(user domains.User) (newUser *domains.User, err error) {

	if err := u.DB.Clauses(clause.Returning{}).Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *userRepository) FindByUsernameAndPassword(username string, password string) (user *domains.User, err error) {
	foundUser := new(domains.User)
	if err := u.DB.First(&foundUser, "username = ? AND password = ?", username, password).Error; err != nil {
		return nil, err
	}
	return foundUser, nil
}

func (u *userRepository) FindByUsername(username string) (user *domains.User, err error) {

	foundUser := new(domains.User)

	if err := u.DB.First(&foundUser, "username = ?", username).Error; err != nil {
		return nil, err
	}

	return foundUser, nil
}

func (u *userRepository) FindById(id uint) (user *domains.User, err error) {
	foundUser := new(domains.User)

	if err := u.DB.First(&foundUser, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return foundUser, nil
}

func (u *userRepository) FindAllByIds(ids []uint) (user *[]domains.User, err error) {
	foundUser := new([]domains.User)

	if err := u.DB.Where("id IN ?", ids).Find(&foundUser).Error; err != nil {
		return nil, err
	}

	return foundUser, nil
}

func (u *userRepository) DeleteById(id uint) (err error) {
	if err := u.DB.Delete(&domains.User{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}
