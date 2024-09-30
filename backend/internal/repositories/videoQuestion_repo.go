package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

type IVideoQuestionRepository interface {
	Create(question domains.VideoQuestion) (*domains.VideoQuestion, error)
	GetById(id uint) (*domains.VideoQuestion, error)
	GetByPortalId(id uint) ([]domains.VideoQuestion, error)
	GetByWorkspaceId(id uint) (*domains.Workspace, error)
	Update(question domains.VideoQuestion) error
	DeleteById(id uint) error
}

type videoQuestionRepository struct {
	DB gorm.DB
}

func NewVideoQuestionRepository(db gorm.DB) IVideoQuestionRepository {
	return &videoQuestionRepository{
		DB: db,
	}
}

func (v videoQuestionRepository) Create(question domains.VideoQuestion) (*domains.VideoQuestion, error) {
	if err := v.DB.Create(&question).Error; err != nil { // Do we need .Clauses(clause.Returning{}) here???
		return nil, err
	}

	return &question, nil
}

func (v videoQuestionRepository) GetById(id uint) (*domains.VideoQuestion, error) {
	question := domains.VideoQuestion{}
	if err := v.DB.First(&question, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &question, nil
}

func (v videoQuestionRepository) GetByPortalId(id uint) ([]domains.VideoQuestion, error) {
	var question []domains.VideoQuestion
	if err := v.DB.Find(&question, "portal_id = ?", id).Error; err != nil {
		return nil, err
	}

	return question, nil
}

func (v videoQuestionRepository) GetByWorkspaceId(id uint) (*domains.Workspace, error) {
	var workspace domains.Workspace
	if err := v.DB.Preload("VideoQuestion").First(&workspace, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &workspace, nil
}

func (v videoQuestionRepository) Update(question domains.VideoQuestion) error {
	if err := v.DB.Updates(&question).Error; err != nil {
		return err
	}

	return nil
}

func (v videoQuestionRepository) DeleteById(id uint) error {
	if err := v.DB.Delete(&domains.VideoQuestion{}, "id = ?", id).Error; err != nil {
		return err
	}

	return nil
}
