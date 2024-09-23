package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type ILobbyRepository interface {
	Create(question domains.Lobby) (*domains.Lobby, error)
	GetById(id uint) (*domains.Lobby, error)
	Update(question domains.Lobby) error
	DeleteById(id uint) error
}

type lobbyRepository struct {
	DB gorm.DB
}

func NewLobbyRepository(db gorm.DB) ILobbyRepository {
	return &lobbyRepository{
		DB: db,
	}
}

func (l lobbyRepository) Create(question domains.Lobby) (*domains.Lobby, error) {
	if err := l.DB.Create(&question).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &question, nil
}

func (l lobbyRepository) GetById(id uint) (*domains.Lobby, error) {
	question := domains.Lobby{}
	if err := l.DB.First(&question, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &question, nil
}

func (l lobbyRepository) Update(question domains.Lobby) error {
	if err := l.DB.Updates(&question).Error; err != nil {
		return err
	}

	return nil
}

func (l lobbyRepository) DeleteById(id uint) error {
	if err := l.DB.Delete(&domains.Lobby{}, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}
