package services

import (
	"log"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
)

type authService struct {
	userRepository repositories.IUserRepository
}

func NewAuthService(userRepository repositories.IUserRepository) IAuthService {
	return &authService{
		userRepository: userRepository,
	}
}

func (a *authService) Login(username string, password string) (userId *uint, accessToken *string, err error) {
	user, err := a.userRepository.FindByUsername(username)
	if err != nil {
		return nil, nil, ErrorInvalidCredentials
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, nil, err
	}

	token, err := a.GenerateJwtToken(user.ID, user.Username, time.Now().Add(time.Hour*72))

	return &user.ID, &token, nil
}

func (a *authService) GenerateJwtToken(userId uint, username string, expiration time.Time) (string, error) {
	privateKey := []byte(viper.GetString("JWT_SECRET"))
	claims := jwt.MapClaims{
		"id":       userId,
		"username": username,
		"exp":      expiration.Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(privateKey)
	if err != nil {
		log.Printf("token.SignedString: %v", err)
		return "", err
	}
	return tokenString, nil

}

func (a *authService) Me(userId uint) (user *domains.User, err error) {
	user, err = a.userRepository.FindById(userId)

	if err != nil {
		return nil, ErrorUserNotFound
	}

	return user, nil
}
