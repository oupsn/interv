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
	ErrorFindRoom       = fiber.NewError(fiber.StatusInternalServerError, "error finding room")
	ErrorFindQuestion   = fiber.NewError(fiber.StatusInternalServerError, "error finding question")
)

type IVideoInterviewService interface {
	GetVideoInterviewContext(roomId uint) ([]domains.VideoQuestion, error)
	GetVideoInterviewQuestion(roomId uint) (*domains.VideoQuestion, error)
	SubmitVideoInterview(file *multipart.FileHeader) error
}

type videoInterviewService struct {
	objectRepo        repositories.IObjectRepository
	videoQuestionRepo repositories.IVideoQuestionRepository
	roomRepo          repositories.IRoomRepository
}

func NewVideoInterviewService(objectRepo repositories.IObjectRepository, videoQuestionRepo repositories.IVideoQuestionRepository, roomRepo repositories.IRoomRepository) IVideoInterviewService {
	return &videoInterviewService{
		objectRepo:        objectRepo,
		videoQuestionRepo: videoQuestionRepo,
		roomRepo:          roomRepo,
	}
}

func (v videoInterviewService) GetVideoInterviewContext(roomId uint) ([]domains.VideoQuestion, error) {
	room, err := v.roomRepo.GetById(roomId)
	if err != nil {
		return nil, ErrorFindRoom
	}

	workspace, err := v.videoQuestionRepo.GetByWorkspaceId(room.WorkspaceID)
	if err != nil {
		return nil, ErrorFindQuestion
	}

	var videoQuestion []domains.VideoQuestion
	for _, v := range workspace.VideoQuestion {
		videoQuestion = append(videoQuestion, *v)
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
	filename := "RoomID-UID-QUESTIONINDEX-QUESTIONID" + file.Filename //TODO: Implement this
	filename = strings.ReplaceAll(filename, " ", "")
	if err := v.objectRepo.Upload(file, "video-interview", filename); err != nil {
		return ErrorUploadingVideo
	}
	return nil
}
