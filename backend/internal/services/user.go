package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/v"
	"strings"
)

type userService struct {
	userRepo repositories.UserRepository
}

func NewUserService(userRepo repositories.UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

func (u *userService) Create(username string, password string, role string, department string) (user *domains.User, err error) {

	if _, err := u.userRepo.FindByUsername(strings.TrimSpace(username)); err == nil {
		return nil, ErrUserAlreadyExists
	}

	return u.userRepo.Create(domains.User{
		Username:   v.Ptr(strings.TrimSpace(username)),
		Password:   v.Ptr(strings.TrimSpace(password)),
		Role:       v.Ptr(strings.ToLower(strings.TrimSpace(role))),
		Department: v.Ptr(strings.TrimSpace(department)),
	})
}

func (u *userService) Delete(id uint) (err error) {
	return u.userRepo.DeleteById(id)
}
