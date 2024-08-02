package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type IUserRepository interface {
	Create(user domains.User) (newUser *domains.User, err error)
	FindByUsernameAndPassword(username string, password string) (user *domains.User, err error)
	FindByUsername(username string) (user *domains.User, err error)
	FindById(id uint) (user *domains.User, err error)
	DeleteById(id uint) (err error)
}
