package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type codingInterviewService struct {
	codeCompilationRepository repositories.ICompilationRepository
}

func NewCodingInterviewService(codeCompilationRepository repositories.ICompilationRepository) ICodingInterviewService {
	return &codingInterviewService{
		codeCompilationRepository: codeCompilationRepository,
	}
}

func (s *codingInterviewService) GetCodingInterviewQuestions() (string, error) {
	return "", nil
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

func (*codingInterviewService) SaveCodingSnapshot(code string) (string, error) {
	panic("unimplemented")
}
