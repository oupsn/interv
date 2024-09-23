package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/gofiber/fiber/v2"
	"mime/multipart"
	"strings"
)

var (
	ErrorUploadingVideo = fiber.NewError(fiber.StatusInternalServerError, "error uploading video")
	ErrorFindLobby      = fiber.NewError(fiber.StatusInternalServerError, "error finding lobby")
	ErrorFindQuestion   = fiber.NewError(fiber.StatusInternalServerError, "error finding question")
)

type IVideoInterviewService interface {
	GetVideoInterviewContext(lobbyId uint) ([]domains.VideoQuestion, error)
	GetVideoInterviewQuestion(lobbyId uint) (*domains.VideoQuestion, error)
	SubmitVideoInterview(file *multipart.FileHeader) error
}

type videoInterviewService struct {
	objectRepo        repositories.IObjectRepository
	videoQuestionRepo repositories.IVideoQuestionRepository
	lobbyRepo         repositories.ILobbyRepository
}

func NewVideoInterviewService(objectRepo repositories.IObjectRepository, videoQuestionRepo repositories.IVideoQuestionRepository, lobbyRepo repositories.ILobbyRepository) IVideoInterviewService {
	return &videoInterviewService{
		objectRepo:        objectRepo,
		videoQuestionRepo: videoQuestionRepo,
		lobbyRepo:         lobbyRepo,
	}
}

func (v videoInterviewService) GetVideoInterviewContext(lobbyId uint) ([]domains.VideoQuestion, error) {
	lobby, err := v.lobbyRepo.GetById(lobbyId)
	if err != nil {
		return nil, ErrorFindLobby
	}

	videoQuestion, err := v.videoQuestionRepo.GetByWorkspaceId(lobby.WorkspaceID)
	if err != nil {
		return nil, ErrorFindQuestion
	}

	return videoQuestion, nil
}

func (v videoInterviewService) GetVideoInterviewQuestion(questionId uint) (*domains.VideoQuestion, error) {
	videoQuestion, err := v.videoQuestionRepo.GetById(questionId)
	if err != nil {
		return nil, ErrorFindQuestion
	}

	return videoQuestion, nil
}

func (v videoInterviewService) SubmitVideoInterview(file *multipart.FileHeader) error {
	filename := "LOBBYID-UID-QUESTIONINDEX-QUESTIONID" + file.Filename //TODO: Implement this
	filename = strings.ReplaceAll(filename, " ", "")
	if err := v.objectRepo.Upload(file, "video-interview", filename); err != nil {
		return ErrorUploadingVideo
	}
	return nil
}
