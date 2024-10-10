package services

import (
	"encoding/json"
	"fmt"
	"mime/multipart"
	"strings"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type codingInterviewService struct {
	codeCompilationRepository repositories.ICompilationRepository
	codingInterviewRepository repositories.ICodingInterviewRepository
	objectRepository          repositories.IObjectRepository
	lintRepository            repositories.ILinterRepository
}

func NewCodingInterviewService(codeCompilationRepository repositories.ICompilationRepository, codingInterviewRepository repositories.ICodingInterviewRepository, objectRepository repositories.IObjectRepository, lintRepository repositories.ILinterRepository) ICodingInterviewService {

	return &codingInterviewService{
		codeCompilationRepository: codeCompilationRepository,
		codingInterviewRepository: codingInterviewRepository,
		objectRepository:          objectRepository,
		lintRepository:            lintRepository,
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

func (s *codingInterviewService) GetCodingInterviewQuestionsInWorkspace(workspaceId int) ([]domains.CodingQuestion, error) {
	questions, err := s.codingInterviewRepository.GetCodingQuestionListInWorkspace(workspaceId)
	if err != nil {
		return []domains.CodingQuestion{}, ErrorGetCodingInterviewQuestions
	}
	return questions, nil
}

func (s *codingInterviewService) GetCodingSubmissionResultByUser(userID string) (domains.CodingQuestionSubmissionResult, error) {
	var result domains.CodingQuestionSubmissionResult
	videoURL, videoErr := s.objectRepository.Get("coding-interview", fmt.Sprintf("%d-video", userID))
	screenURL, screenErr := s.objectRepository.Get("coding-interview", fmt.Sprintf("%d-screen", userID))
	if videoErr != nil || screenErr != nil {
		return domains.CodingQuestionSubmissionResult{}, ErrorGetObjectSubmission
	}
	result.VideoURL = videoURL
	result.ScreenURL = screenURL
	submissions, err := s.codingInterviewRepository.GetCodingQuestionSubmissionByUserID(userID)
	if err != nil {
		return domains.CodingQuestionSubmissionResult{}, ErrorGetCodingSubmissionResultByUser
	}
	result.Result = submissions
	return result, nil
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

func (s *codingInterviewService) CreateCodingQuestion(req domains.CodingQuestion, portalID uint) (domains.CreateCodingQuestionResponse, error) {
	newQuestion, err := s.codingInterviewRepository.SaveCodingQuestion(req)
	if err != nil {
		return domains.CreateCodingQuestionResponse{}, ErrorCreateCodingQuestion
	}
	err = s.codingInterviewRepository.AddCodingQuestion(newQuestion.Id, "portal", uint(portalID))
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

	return domains.CreateCodingQuestionResponse{
		Status:  "success",
		Message: "Coding snapshot created successfully",
	}, nil
}

func (s *codingInterviewService) CreateCodingSubmission(req []domains.CreateCodingSubmissionRequest) (domains.CreateCodingSubmissionResponse, error) {
	for _, submission := range req {
		langCode := map[string]uint{
			"python": 10,
			"java":   4,
			"c":      1,
		}
		compileReq := domains.CompilationRequest{
			QuestionID: submission.QuestionID,
			SourceCode: submission.Code,
			Language:   langCode[submission.Language],
		}
		compileResult, err := s.GetCompileResult(compileReq)
		if err != nil {
			return domains.CreateCodingSubmissionResponse{}, ErrorGetCompileResult
		}
		lintReq := repositories.AnalyzeRequest{
			Code:     submission.Code,
			Language: submission.Language,
		}
		lintResult, err := s.lintRepository.Analyze(lintReq)
		if err != nil {
			return domains.CreateCodingSubmissionResponse{}, ErrorGetLintResult
		}
		// Encode lintResult to JSON string
		lintResultJSON, err := json.Marshal(lintResult)
		if err != nil {
			return domains.CreateCodingSubmissionResponse{}, ErrorEncodingLintResult
		}

		submissionResult, err := s.codingInterviewRepository.SaveCodingSubmission(domains.CodingQuestionSubmission{
			RoomID:       submission.RoomID,
			Code:         submission.Code,
			QuestionID:   submission.QuestionID,
			Language:     submission.Language,
			TimeTaken:    submission.TimeTaken,
			LinterResult: string(lintResultJSON),
		})
		if err != nil {
			return domains.CreateCodingSubmissionResponse{}, ErrorCreateCodingSubmission
		}
		/* 		Insert compile result
		 */
		for _, testCase := range compileResult {
			compileResultJSON, err := json.Marshal(testCase.CompileResult)
			if err != nil {
				return domains.CreateCodingSubmissionResponse{}, ErrorEncodingCompileResult
			}
			_, err = s.codingInterviewRepository.SaveCodingSubmissionTestCaseResult(domains.CodingQuestionSubmissionTestCaseResult{
				TestCaseId:    uint(testCase.TestcaseId),
				SubmissionId:  submissionResult.Id,
				IsPassed:      testCase.IsPassed,
				CompileResult: string(compileResultJSON),
			})
			if err != nil {
				return domains.CreateCodingSubmissionResponse{}, ErrorCreateCodingSubmissionTestCaseResult
			}
		}

	}
	s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, true)

	return domains.CreateCodingSubmissionResponse{
		Status:  "success",
		Message: "Coding submission created successfully",
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

func (s *codingInterviewService) UploadCodingVideo(roomID string, screenFile *multipart.FileHeader, videoFile *multipart.FileHeader) error {
	filename := fmt.Sprintf("%s-%s", roomID, screenFile.Filename)
	err := s.objectRepository.Upload(screenFile, "coding-interview", filename)
	if err != nil {
		fmt.Println(err)
		return ErrorUploadingVideo
	}
	filename = fmt.Sprintf("%s-%s", roomID, videoFile.Filename)
	err = s.objectRepository.Upload(videoFile, "coding-interview", filename)
	if err != nil {
		fmt.Println(err)
		return ErrorUploadingVideo
	}
	return nil
}
