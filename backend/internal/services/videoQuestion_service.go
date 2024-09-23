package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type IVideoQuestionService interface {
	CreateQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error)
	GetQuestionById(id uint) (*domains.VideoQuestion, error)
	GetQuestionByWorkspaceId(id uint) ([]domains.VideoQuestion, error)
	UpdateQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error)
	DeleteQuestionById(id uint) error
}

type videoQuestionService struct {
	questionRepo repositories.IVideoQuestionRepository
}

func NewQuestionService(questionRepo repositories.IVideoQuestionRepository) IVideoQuestionService {
	return &videoQuestionService{
		questionRepo: questionRepo,
	}
}

func (v videoQuestionService) CreateQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error) {
	response, err := v.questionRepo.Create(question)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (v videoQuestionService) GetQuestionById(id uint) (*domains.VideoQuestion, error) {
	question, err := v.questionRepo.GetById(id)
	if err != nil {
		return nil, err
	}

	return question, nil
}

func (v videoQuestionService) GetQuestionByWorkspaceId(id uint) ([]domains.VideoQuestion, error) {
	question, err := v.questionRepo.GetByWorkspaceId(id)
	if err != nil {
		return nil, err
	}

	return question, nil
}

func (v videoQuestionService) UpdateQuestion(question domains.VideoQuestion) (*domains.VideoQuestion, error) {
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

func (v videoQuestionService) DeleteQuestionById(id uint) error {
	err := v.questionRepo.DeleteById(id)
	if err != nil {
		return err
	}

	return nil
}
