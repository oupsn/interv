package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type IVideoQuestionSnapshotRepository interface {
	Create(question domains.VideoQuestionSnapshot) (*domains.VideoQuestionSnapshot, error)
	GetByCandidateId(candidateId uint) ([]domains.VideoQuestionSnapshot, error)
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

func (v videoQuestionSnapshotRepository) GetByCandidateId(candidateId uint) ([]domains.VideoQuestionSnapshot, error) {
	var questionSnapshots []domains.VideoQuestionSnapshot
	if err := v.DB.Preload("VideoQuestion").Find(&questionSnapshots, "candidate_id = ?", candidateId).Error; err != nil {
		return nil, err
	}

	return questionSnapshots, nil
}
