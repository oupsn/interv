package services

import (
	"encoding/json"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/valyala/fasthttp"
)

type codingInterviewService struct {
	codeCompilationRepository repositories.ICompilationRepository
	codingInterviewRepository repositories.ICodingInterviewRepository
	roomRepository            repositories.IRoomRepository
	objectRepository          repositories.IObjectRepository
	lintRepository            repositories.ILinterRepository
	tempDir                   string
}
type ChunkInfo struct {
	FileID      string
	ChunkIndex  int
	TotalChunks int
	FileType    string
}

func NewCodingInterviewService(codeCompilationRepository repositories.ICompilationRepository, codingInterviewRepository repositories.ICodingInterviewRepository, roomRepository repositories.IRoomRepository, objectRepository repositories.IObjectRepository, lintRepository repositories.ILinterRepository, tempDir string) ICodingInterviewService {

	return &codingInterviewService{
		codeCompilationRepository: codeCompilationRepository,
		codingInterviewRepository: codingInterviewRepository,
		roomRepository:            roomRepository,
		objectRepository:          objectRepository,
		lintRepository:            lintRepository,
		tempDir:                   tempDir,
	}
}

func (s *codingInterviewService) GetCodingInterviewQuestionRoomContext(roomID string) (domains.CodingQuestionRoomContext, error) {
	return s.codingInterviewRepository.GetCodingQuestionRoomContext(roomID)
}

func (s *codingInterviewService) GetCodingInterviewQuestions(roomID string) ([]domains.CodingQuestionResponse, error) {
	questions, err := s.codingInterviewRepository.GetCodingQuestionList(roomID)
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

func (s *codingInterviewService) GetCodingSubmissionResultByUserWorkspace(userID uint, workspaceID uint) (domains.CodingQuestionSubmissionResult, error) {
	var result domains.CodingQuestionSubmissionResult
	roomID, err := s.codingInterviewRepository.GetRoomIDByUserIDAndWorkspaceID(userID, workspaceID)
	if err != nil {
		return domains.CodingQuestionSubmissionResult{}, ErrorGetRoomIDByUserID
	}
	workspace, err := s.codingInterviewRepository.GetWorkspaceByRoomID(roomID)
	if err != nil {
		return domains.CodingQuestionSubmissionResult{}, ErrorGetWorkspace
	}
	videoURL, videoErr := s.objectRepository.Get("coding-interview", fmt.Sprintf("%s-video.mp4", roomID))
	screenURL, screenErr := s.objectRepository.Get("coding-interview", fmt.Sprintf("%s-screen.mp4", roomID))
	if videoErr != nil || screenErr != nil {
		return domains.CodingQuestionSubmissionResult{}, ErrorGetObjectSubmission
	}
	result.VideoURL = videoURL
	result.ScreenURL = screenURL
	result.IsScreen = *workspace.ReqScreen
	result.IsVideo = *workspace.ReqCamera
	submissions, err := s.codingInterviewRepository.GetCodingQuestionSubmissionByUserIDWorkspaceID(userID, workspaceID)
	if err != nil {
		fmt.Println(err)
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
		fmt.Println("error in GetCodingQuestionTestcaseByQuestionID", err)
		return []domains.CompilationResultResponse{}, ErrorGetCodingInterviewTestcase
	}
	for _, testCase := range testCases {
		input := strings.TrimRight(testCase.Input, "\n")
		output := testCase.Output
		token, err := s.codeCompilationRepository.GenerateCompileToken(req, input)
		if err != nil {
			fmt.Println("error in GenerateCompileToken", err)
			return []domains.CompilationResultResponse{}, ErrorGetCompileToken
		}
		var result domains.CompilationCompileResult
		startTime := time.Now()
		for time.Since(startTime) < 20*time.Second {
			res, err := s.codeCompilationRepository.GetCompileResult(token.Token)
			if err != nil && err.Error() != "EOF" {
				fmt.Println("error in GetCompileResult", err)
				return []domains.CompilationResultResponse{}, ErrorGetCompileResult
			}
			if res.Status.Description != "Processing" && res.Status.Description != "In Queue" {
				result = res
				break
			}

			time.Sleep(500 * time.Millisecond)
		}
		// Remove newline characters from stdout and output before comparison
		cleanStdout := strings.ReplaceAll(strings.TrimSpace(result.Stdout), "\n", "")
		cleanOutput := strings.ReplaceAll(strings.ReplaceAll(strings.TrimSpace(output), "\n", ""), "\\n", "")
		fmt.Println("actual output", cleanStdout)
		fmt.Println("testcase output", cleanOutput)
		if cleanStdout == cleanOutput {
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
	if len(req) == 0 {
		return domains.CreateCodingSubmissionResponse{}, ErrorInvalidSubmissionRequest
	}
	s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, true)
	go s.processCodingSubmission(req)

	return domains.CreateCodingSubmissionResponse{
		Status:  "processing",
		Message: "Coding submission is being processed",
	}, nil
}

// New helper function to process the submission
func (s *codingInterviewService) processCodingSubmission(req []domains.CreateCodingSubmissionRequest) {
	var totalScore uint = 0
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
		fmt.Println("compileResult", compileResult)
		if err != nil {
			s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
			fmt.Println("error in compileResult", err)
			return
		}
		lintReq := repositories.AnalyzeRequest{
			Code:     submission.Code,
			Language: submission.Language,
		}
		lintResult, err := s.lintRepository.Analyze(lintReq)
		if err != nil {
			s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
			fmt.Println("error in lintResult", err)
			return
		}
		fmt.Println("lintResult", lintResult)
		// Encode lintResult to JSON string
		lintResultJSON, err := json.Marshal(lintResult)
		if err != nil {
			s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
			fmt.Println("error in lintResultJSON", err)
			return
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
			s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
			fmt.Println("error in saveCodingSubmission", err)
			return
		}
		/* 		Insert compile result
		 */
		for _, testCase := range compileResult {
			compileResultJSON, err := json.Marshal(testCase.CompileResult)
			if err != nil {
				s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
				fmt.Println("error in compileResultJSON", err)
				return
			}
			_, err = s.codingInterviewRepository.SaveCodingSubmissionTestCaseResult(domains.CodingQuestionSubmissionTestCaseResult{
				TestCaseId:    uint(testCase.TestcaseId),
				SubmissionId:  submissionResult.Id,
				IsPassed:      testCase.IsPassed,
				CompileResult: string(compileResultJSON),
			})
			if err != nil {
				s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, false)
				fmt.Println("error in saveCodingSubmissionTestCaseResult", err)
				return
			}
			if testCase.IsPassed {
				totalScore += 1
			}
		}
	}
	// Update final results
	s.roomRepository.SaveRoomScore(req[0].RoomID, totalScore)
	s.codingInterviewRepository.UpdateCodingDoneInRoom(req[0].RoomID, true)
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

func (s *codingInterviewService) DeleteCodingQuestionInWorkspace(workspaceID uint) error {
	return s.codingInterviewRepository.DeleteCodingQuestionInWorkspace(workspaceID)
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

func (s *codingInterviewService) UploadVideoChunk(roomID string, chunk *multipart.FileHeader, info domains.ChunkInfo) error {
	// Create directory for this file if it doesn't exist
	chunkDir := filepath.Join(s.tempDir, roomID, info.FileID)
	if err := os.MkdirAll(chunkDir, 0755); err != nil {
		return fmt.Errorf("failed to create chunk directory: %w", err)
	}

	// Save chunk to temporary file
	chunkPath := filepath.Join(chunkDir, fmt.Sprintf("chunk_%d", info.ChunkIndex))

	// Save uploaded file to chunk path
	if err := fasthttp.SaveMultipartFile(chunk, chunkPath); err != nil {
		return fmt.Errorf("failed to save chunk file: %w", err)
	}

	return nil
}

func (s *codingInterviewService) CompleteVideoUpload(roomID, fileID, fileType string) error {
	chunkDir := filepath.Join(s.tempDir, roomID, fileID)

	// Get list of chunks
	files, err := os.ReadDir(chunkDir)
	if err != nil {
		return fmt.Errorf("failed to read chunk directory: %w", err)
	}

	// Create final file
	finalPath := filepath.Join(chunkDir, "final")
	finalFile, err := os.Create(finalPath)
	if err != nil {
		return fmt.Errorf("failed to create final file: %w", err)
	}
	defer finalFile.Close()
	// Combine chunks
	for i := 0; i < len(files); i++ {
		chunkPath := filepath.Join(chunkDir, fmt.Sprintf("chunk_%d", i))
		chunkData, err := os.ReadFile(chunkPath)
		if err != nil {
			return fmt.Errorf("failed to read chunk %d: %w", i, err)
		}

		if _, err := finalFile.Write(chunkData); err != nil {
			return fmt.Errorf("failed to write to final file: %w", err)
		}

		// Clean up chunk
		os.Remove(chunkPath)
	}

	finalFile.Seek(0, 0)
	filename := fmt.Sprintf("%s-%s.mp4", roomID, fileType)
	if err := s.objectRepository.UploadOsFile(finalPath, "coding-interview", filename); err != nil {
		return fmt.Errorf("failed to upload final file: %w", err)
	}

	os.RemoveAll(chunkDir)

	return nil
}
