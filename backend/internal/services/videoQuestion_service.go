package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type IVideoQuestionService interface {
	CreateVideoQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error)
	GetVideoQuestionById(id uint) (*domains.VideoQuestion, error)
	GetVideoQuestionByPortalId(id uint) ([]domains.VideoQuestion, error)
	UpdateVideoQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error)
	DeleteVideoQuestionById(id uint) error
}

type videoQuestionService struct {
	questionRepo repositories.IVideoQuestionRepository
}

func NewVideoQuestionService(questionRepo repositories.IVideoQuestionRepository) IVideoQuestionService {
	return &videoQuestionService{
		questionRepo: questionRepo,
	}
}

func (v videoQuestionService) CreateVideoQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error) {
	response, err := v.questionRepo.Create(question)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (v videoQuestionService) GetVideoQuestionById(id uint) (*domains.VideoQuestion, error) {
	question, err := v.questionRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return question, nil
}

func (v videoQuestionService) GetVideoQuestionByPortalId(id uint) ([]domains.VideoQuestion, error) {
	question, err := v.questionRepo.GetByPortalId(id)
	if err != nil {
		return nil, err
	}

	return question, nil
}

func (v videoQuestionService) UpdateVideoQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error) {
	err := v.questionRepo.Update(question)
	if err != nil {
		return nil, err
	}

	response, err := v.questionRepo.GetById(question.ID)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (v videoQuestionService) DeleteVideoQuestionById(id uint) error {
	err := v.questionRepo.DeleteById(id)
	if err != nil {
		return err
	}

	return nil
}
