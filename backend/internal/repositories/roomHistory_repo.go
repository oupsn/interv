package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type IRoomHistoryRepository interface {
	CreateHistory(domains.RoomHistory) (*domains.RoomHistory, error)
	GetHistoryByRoomIdAndQuestionId(roomID string, questionID uint) ([]domains.RoomHistory, error)
	UpdateRoomHistory(history domains.RoomHistory) error
}

type roomHistoryRepository struct {
	DB gorm.DB
}

func NewRoomHistoryRepository(db gorm.DB) IRoomHistoryRepository {
	return &roomHistoryRepository{
		DB: db,
	}
}

func (r roomHistoryRepository) CreateHistory(history domains.RoomHistory) (*domains.RoomHistory, error) {
	if err := r.DB.Create(&history).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &history, nil
}

func (r roomHistoryRepository) GetHistoryByRoomIdAndQuestionId(roomID string, questionId uint) ([]domains.RoomHistory, error) {
	var history []domains.RoomHistory
	if err := r.DB.Where("room_id = ? AND video_question_id = ?", roomID, questionId).Find(&history).Error; err != nil {
		return nil, err
	}

	return history, nil
}

func (r roomHistoryRepository) UpdateRoomHistory(history domains.RoomHistory) error {
	var h domains.RoomHistory
	err := r.DB.First(&h, "room_id = ? AND video_question_id = ?", history.RoomID, history.VideoQuestionID).Error
	if err != nil {
		return err
	}
	history.ID = h.ID
	if err := r.DB.Where("room_id = ? AND video_question_id = ?", history.RoomID, history.VideoQuestionID).Updates(&history).Error; err != nil {
		return err
	}

	return nil
}
