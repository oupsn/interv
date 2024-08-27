package services

import (
	"time"

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

func (s *codingInterviewService) CompileCode(req domains.CompilationRequest) (domains.CompilationResultResponse, error) {
	token, err := s.codeCompilationRepository.GenerateCompileToken(req)
	if err != nil {
		return domains.CompilationResultResponse{}, ErrorGetCompileToken
	}
	res, err := s.codeCompilationRepository.GetCompileResult(token.Token)
	if err != nil {
		return domains.CompilationResultResponse{}, ErrorGetCompileResult
	}
	for res.Status.Description != "Accepted" {
		res, err = s.codeCompilationRepository.GetCompileResult(token.Token)
		if err != nil {
			return domains.CompilationResultResponse{}, ErrorGetCompileResult
		}
		time.Sleep(time.Second)
	}
	return res, nil

}

func (*codingInterviewService) SaveCodingSnapshot(code string) (string, error) {
	panic("unimplemented")
}
