package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type IVideoQuestionSnapshotRepository interface {
	Create(question domains.VideoQuestionSnapshot) (*domains.VideoQuestionSnapshot, error)
}

type videoQuestionSnapshotRepository struct {
	DB gorm.DB
}

func NewVideoQuestionSnapshotRepository(db gorm.DB) IVideoQuestionSnapshotRepository {
	return &videoQuestionSnapshotRepository{
		DB: db,
	}
}

func (v videoQuestionSnapshotRepository) Create(questionSnapshot domains.VideoQuestionSnapshot) (*domains.VideoQuestionSnapshot, error) {
	if err := v.DB.Create(&questionSnapshot).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &questionSnapshot, nil
}
