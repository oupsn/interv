package repositories

import (
	"context"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
	"time"
)

type IRoomRepository interface {
	Create(question domains.Room) (*domains.Room, error)
	CreateMultiple(questions []domains.Room) ([]domains.Room, error)
	GetById(id string) (*domains.Room, error)
	Update(question domains.Room) error
	DeleteById(id string) error
	SetRoomSession(roomId string, sessionIdentifier string) error
	RevokeRoomSession(roomId string) error
	GetRoomSession(roomId string) (string, error)
}

type roomRepository struct {
	DB    gorm.DB
	REDIS redis.Client
}

func NewRoomRepository(db gorm.DB, redis redis.Client) IRoomRepository {
	return &roomRepository{
		DB:    db,
		REDIS: redis,
	}
}

func (l roomRepository) Create(room domains.Room) (*domains.Room, error) {
	if err := l.DB.Create(&room).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &room, nil
}

func (l roomRepository) CreateMultiple(rooms []domains.Room) ([]domains.Room, error) {
	if err := l.DB.Create(&rooms).Error; err != nil {
		return nil, err
	}

	return rooms, nil
}

func (l roomRepository) GetById(id string) (*domains.Room, error) {
	room := domains.Room{}
	if err := l.DB.First(&room, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &room, nil
}

func (l roomRepository) Update(question domains.Room) error {
	if err := l.DB.Updates(&question).Error; err != nil {
		return err
	}

	return nil
}

func (l roomRepository) DeleteById(id string) error {
	if err := l.DB.Delete(&domains.Room{}, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}

func (l roomRepository) SetRoomSession(roomId string, sessionIdentifier string) error {
	ctx := context.Background()
	_, err := l.REDIS.Set(ctx, roomId, sessionIdentifier, time.Second*10).Result()
	if err != nil {
		return err
	}

	return nil
}

func (l roomRepository) GetRoomSession(roomId string) (string, error) {
	ctx := context.Background()
	value, err := l.REDIS.Get(ctx, roomId).Result()
	if err != nil {
		return "", err
	}

	return value, nil
}

func (l roomRepository) RevokeRoomSession(roomId string) error {
	ctx := context.Background()
	_, err := l.REDIS.Del(ctx, roomId).Result()
	if err != nil {
		return err
	}

	return nil
}
