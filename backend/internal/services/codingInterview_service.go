package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type codingInterviewService struct {
	codeCompilationRepository repositories.ICompilationRepository
	codingInterviewRepository repositories.ICodingInterviewRepository
}

func NewCodingInterviewService(codeCompilationRepository repositories.ICompilationRepository, codingInterviewRepository repositories.ICodingInterviewRepository) ICodingInterviewService {

	return &codingInterviewService{
		codeCompilationRepository: codeCompilationRepository,
		codingInterviewRepository: codingInterviewRepository,
	}
}

// TODO: Add lobbyId to filter coding question by lobby
func (s *codingInterviewService) GetCodingInterviewQuestions() ([]domains.CodingQuestionResponse, error) {
	questions, err := s.codingInterviewRepository.GetCodingQuestionList()
	if err != nil {
		return []domains.CodingQuestionResponse{}, ErrorGetCodingInterviewQuestions
	}
	return questions, nil
}

func (s *codingInterviewService) GenerateCompileToken(req domains.CompilationRequest) (string, error) {
	token, err := s.codeCompilationRepository.GenerateCompileToken(req)
	if err != nil {
		return "", ErrorGetCompileToken
	}
	return token.Token, nil
}

func (s *codingInterviewService) GetCompileResult(token string) (domains.CompilationResultResponse, error) {
	res, err := s.codeCompilationRepository.GetCompileResult(token)
	if err != nil {
		return domains.CompilationResultResponse{}, ErrorGetCompileResult
	}
	return res, nil
}

func (s *codingInterviewService) CreateCodingQuestion(req domains.CodingQuestion) (domains.CreateCodingQuestionResponse, error) {
	_, err := s.codingInterviewRepository.SaveCodingQuestion(req)
	if err != nil {
		return domains.CreateCodingQuestionResponse{}, ErrorCreateCodingQuestion
	}
	return domains.CreateCodingQuestionResponse{
		Status:  "success",
		Message: "Coding question created successfully",
	}, nil
}

func (*codingInterviewService) SaveCodingSnapshot(code string) (string, error) {
	panic("unimplemented")
}
