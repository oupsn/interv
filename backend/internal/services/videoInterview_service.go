package services

import (
	"mime/multipart"
	"strings"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

var (
	ErrorUploadingVideo  = fiber.NewError(fiber.StatusInternalServerError, "error uploading video")
	ErrorUploadingScreen = fiber.NewError(fiber.StatusInternalServerError, "error uploading screen")
	ErrorFindRoom        = fiber.NewError(fiber.StatusInternalServerError, "error finding room")
	ErrorFindQuestion    = fiber.NewError(fiber.StatusInternalServerError, "error finding question")
)

type IVideoInterviewService interface {
	GetVideoInterviewContext(roomId string) ([]domains.VideoQuestion, error)
	GetVideoInterviewQuestion(questionId uint) (*domains.VideoQuestion, error)
	SubmitVideoInterview(file *multipart.FileHeader, roomId string, candidateId uint, videoQuestionId uint) error
	GetVideoInterviewResult(candidateId uint) ([]domains.VideoQuestionSnapshot, error)
}

type videoInterviewService struct {
	objectRepo                repositories.IObjectRepository
	videoQuestionRepo         repositories.IVideoQuestionRepository
	roomRepo                  repositories.IRoomRepository
	videoQuestionSnapshotRepo repositories.IVideoQuestionSnapshotRepository
}

func NewVideoInterviewService(objectRepo repositories.IObjectRepository, videoQuestionRepo repositories.IVideoQuestionRepository, roomRepo repositories.IRoomRepository, videoQuestionSnapshotRepo repositories.IVideoQuestionSnapshotRepository) IVideoInterviewService {
	return &videoInterviewService{
		objectRepo:                objectRepo,
		videoQuestionRepo:         videoQuestionRepo,
		roomRepo:                  roomRepo,
		videoQuestionSnapshotRepo: videoQuestionSnapshotRepo,
	}
}

func (v videoInterviewService) GetVideoInterviewContext(roomId string) ([]domains.VideoQuestion, error) {
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

func (v videoInterviewService) SubmitVideoInterview(file *multipart.FileHeader, roomId string, candidateId uint, videoQuestionId uint) error {
	filename := fmt.Sprintf("r_%s_c_%d_v_%d_f_%s", roomId, candidateId, videoQuestionId, file.Filename)
	filename = strings.ReplaceAll(filename, " ", "")
	if err := v.objectRepo.Upload(file, "video-interview", filename); err != nil {
		return ErrorUploadingVideo
	}
	_, err := v.videoQuestionSnapshotRepo.Create(domains.VideoQuestionSnapshot{VideoQuestionID: videoQuestionId, CandidateID: candidateId, RoomID: roomId, FileName: filename})
	if err != nil {
		return err
	}
	return nil
}

func (v videoInterviewService) GetVideoInterviewResult(candidateId uint) ([]domains.VideoQuestionSnapshot, error) {
	snapshots, err := v.videoQuestionSnapshotRepo.GetByCandidateId(candidateId)
	if err != nil {
		return nil, err
	}
	for i := range snapshots {
		snapshots[i].FileName, err = v.objectRepo.Get("video-interview", snapshots[i].FileName)
		if err != nil {
			return nil, err
		}
	}
	return snapshots, nil
}
