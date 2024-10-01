package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type IRoomRepository interface {
	Create(question domains.Room) (*domains.Room, error)
	GetById(id uint) (*domains.Room, error)
	Update(question domains.Room) error
	DeleteById(id uint) error
}

type roomRepository struct {
	DB gorm.DB
}

func NewRoomRepository(db gorm.DB) IRoomRepository {
	return &roomRepository{
		DB: db,
	}
}

func (l roomRepository) Create(question domains.Room) (*domains.Room, error) {
	if err := l.DB.Create(&question).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &question, nil
}

func (l roomRepository) GetById(id uint) (*domains.Room, error) {
	question := domains.Room{}
	if err := l.DB.First(&question, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &question, nil
}

func (l roomRepository) Update(question domains.Room) error {
	if err := l.DB.Updates(&question).Error; err != nil {
		return err
	}

	return nil
}

func (l roomRepository) DeleteById(id uint) error {
	if err := l.DB.Delete(&domains.Room{}, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}
