package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/v"
	"golang.org/x/crypto/bcrypt"
	"strings"
)

type userService struct {
	userRepository repositories.IUserRepository
}

func NewUserService(userRepository repositories.IUserRepository) IUserService {
	return &userService{
		userRepository: userRepository,
	}
}

func (u *userService) Create(username string, password string, role string) (user *domains.User, err error) {

	if _, err := u.userRepository.FindByUsername(strings.TrimSpace(username)); err == nil {
		return nil, ErrorUserAlreadyExists
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return u.userRepository.Create(domains.User{
		Username: v.Ptr(strings.TrimSpace(username)),
		Password: v.Ptr(strings.TrimSpace(string(bytes))),
		Role:     v.Ptr(strings.ToLower(strings.TrimSpace(role))),
	})
}

func (u *userService) Delete(id uint) (err error) {
	return u.userRepository.DeleteById(id)
}
