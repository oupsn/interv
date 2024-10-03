package services

import (
	"fmt"
	"strings"
	"time"

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

// TODO: Add roomId to filter coding question by room
func (s *codingInterviewService) GetCodingInterviewQuestions() ([]domains.CodingQuestionResponse, error) {
	questions, err := s.codingInterviewRepository.GetCodingQuestionList()
	if err != nil {
		return []domains.CodingQuestionResponse{}, ErrorGetCodingInterviewQuestions
	}
	return questions, nil
}

func (s *codingInterviewService) GetCodingInterviewQuestionByTitle(title string) (domains.CodingQuestionResponse, error) {
	question, err := s.codingInterviewRepository.GetCodingQuestionByTitle(title)
	if err != nil {
		return domains.CodingQuestionResponse{}, ErrorGetCodingInterviewQuestionByTitle
	}
	return question, nil
}

func (s *codingInterviewService) GetCodingInterviewQuestionsInPortal(portalID int) ([]domains.CodingQuestion, error) {
	questions, err := s.codingInterviewRepository.GetCodingQuestionListInPortal(portalID)
	if err != nil {
		return []domains.CodingQuestion{}, ErrorGetCodingInterviewQuestions
	}
	return questions, nil
}

func (s *codingInterviewService) GenerateCompileToken(req domains.CompilationRequest) (string, error) {
	token, err := s.codeCompilationRepository.GenerateCompileToken(req, "")
	if err != nil {
		return "", ErrorGetCompileToken
	}
	return token.Token, nil
}

func (s *codingInterviewService) GetCompileResult(req domains.CompilationRequest) ([]domains.CompilationResultResponse, error) {
	var compileResult []domains.CompilationResultResponse
	testCases, err := s.codingInterviewRepository.GetCodingQuestionTestcaseByQuestionID(int(req.QuestionID))
	if err != nil {
		return []domains.CompilationResultResponse{}, ErrorGetCodingInterviewTestcase
	}
	for _, testCase := range testCases {
		input := strings.TrimRight(testCase.Input, "\n")
		output := testCase.Output
		token, err := s.codeCompilationRepository.GenerateCompileToken(req, input)
		if err != nil {
			return []domains.CompilationResultResponse{}, ErrorGetCompileToken
		}
		var result domains.CompilationCompileResult
		startTime := time.Now()
		for time.Since(startTime) < 20*time.Second {
			res, err := s.codeCompilationRepository.GetCompileResult(token.Token)
			if err != nil {
				return []domains.CompilationResultResponse{}, ErrorGetCompileResult
			}

			if res.Status.Description == "Accepted" {
				result = res
			}

			if res.Status.Description != "Processing" && res.Status.Description != "In Queue" {
				break
			}

			time.Sleep(500 * time.Millisecond)
		}
		if strings.TrimRight(result.Stdout, "\n") == strings.TrimRight(output, "\n") {
			compileResult = append(compileResult, domains.CompilationResultResponse{
				TestcaseId:    int(testCase.ID),
				IsPassed:      true,
				CompileResult: result,
			})
		} else {
			compileResult = append(compileResult, domains.CompilationResultResponse{
				TestcaseId:    int(testCase.ID),
				IsPassed:      false,
				CompileResult: result,
			})
		}
	}
	return compileResult, nil
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

func (s *codingInterviewService) CreateCodingSnapshot(req []domains.CodingQuestionSnapshot) (domains.CreateCodingQuestionResponse, error) {

	for _, question := range req {
		_, err := s.codingInterviewRepository.SaveCodingSnapshot(question)
		if err != nil {
			return domains.CreateCodingQuestionResponse{}, ErrorCreateCodingSnapshot
		}
	}
	fmt.Println(*req[0].IsSubmitted)
	if req[0].IsSubmitted != nil && *req[0].IsSubmitted {
		s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, true)
	}

	return domains.CreateCodingQuestionResponse{
		Status:  "success",
		Message: "Coding snapshot created successfully",
	}, nil
}

func (s *codingInterviewService) AddCodingQuestion(codingQuestionID uint, target string, targetID uint) error {
	return s.codingInterviewRepository.AddCodingQuestion(codingQuestionID, target, targetID)
}

func (s *codingInterviewService) UpdateCodingQuestion(codingQuestionID uint, question domains.CodingQuestion) (domains.CodingQuestion, error) {
	return s.codingInterviewRepository.UpdateCodingQuestion(codingQuestionID, question)
}

func (s *codingInterviewService) DeleteCodingQuestion(codingQuestionID uint) error {
	return s.codingInterviewRepository.DeleteCodingQuestion(codingQuestionID)
}
