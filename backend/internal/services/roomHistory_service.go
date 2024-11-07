package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"github.com/gofiber/fiber/v2"
	"math"
	"time"
)

type IRoomHistoryService interface {
	AddRoomHistory(domains.RoomHistory) (*domains.Room, error)
	GetRoomHistory(roomID string, questionID uint) (bool, uint, int, bool, bool, int, int, error)
	UpdateStartAnswerTime(roomID string, questionID uint) error
}

type roomHistoryService struct {
	roomHistoryRepo     repositories.IRoomHistoryRepository
	userRepo            repositories.IUserRepository
	videoQuestionRepo   repositories.IVideoQuestionRepository
	codingInterviewRepo repositories.ICodingInterviewRepository
	workspaceRepo       repositories.IWorkspaceRepository
	portalRepo          repositories.IPortalRepository
	userInWorkspace     repositories.IUserInWorkspaceRepository
}

func NewRoomHistoryService(roomHistoryRepo repositories.IRoomHistoryRepository, userRepo repositories.IUserRepository, videoQuestionRepo repositories.IVideoQuestionRepository, codingInterviewRepo repositories.ICodingInterviewRepository, workspaceRepo repositories.IWorkspaceRepository, portalRepo repositories.IPortalRepository, userInWorkspace repositories.IUserInWorkspaceRepository) IRoomHistoryService {
	return &roomHistoryService{
		roomHistoryRepo:     roomHistoryRepo,
		userRepo:            userRepo,
		videoQuestionRepo:   videoQuestionRepo,
		codingInterviewRepo: codingInterviewRepo,
		workspaceRepo:       workspaceRepo,
		portalRepo:          portalRepo,
		userInWorkspace:     userInWorkspace,
	}
}

func (r roomHistoryService) AddRoomHistory(room domains.RoomHistory) (*domains.Room, error) {
	_, err := r.roomHistoryRepo.GetHistoryByRoomIdAndQuestionId(room.RoomID, room.VideoQuestionID)
	if err == nil {
		return nil, fiber.NewError(fiber.StatusConflict, "room history already exists")
	}

	history, err := r.roomHistoryRepo.CreateHistory(domains.RoomHistory{
		RoomID:           room.RoomID,
		VideoQuestionID:  room.VideoQuestionID,
		StartPrepareTime: time.Now(),
		AttemptNo:        1,
	})
	if err != nil {
		return nil, err
	}

	return &history.Room, nil
}

func (r roomHistoryService) GetRoomHistory(roomID string, questionID uint) (bool, uint, int, bool, bool, int, int, error) {
	videoQuestion, err := r.videoQuestionRepo.GetById(questionID)
	if err != nil {
		return false, 0, 0, false, false, 0, 0, err
	}

	histories, err := r.roomHistoryRepo.GetHistoryByRoomIdAndQuestionId(roomID, questionID)
	if err != nil {
		return false, 0, 0, false, false, 0, 0, err
	}

	if len(histories) == 0 {
		currentAttempt := 1
		maxAttempt := videoQuestion.TotalAttempt
		shouldSkipQuestion := false
		IsTimeToAnswerLeft := true
		IsTimeToPrepareLeft := true
		timeToAnswerLeft := videoQuestion.TimeToAnswer
		timeToPrepareLeft := videoQuestion.TimeToPrepare

		return shouldSkipQuestion, maxAttempt, currentAttempt, IsTimeToAnswerLeft, IsTimeToPrepareLeft, int(timeToAnswerLeft), int(timeToPrepareLeft), nil

	}
	actualStartAnswerTime := time.Now()
	if histories[len(histories)-1].StartAnswerTime != nil {
		actualStartAnswerTime = *histories[len(histories)-1].StartAnswerTime
	}

	currentAttempt := len(histories) + 1
	maxAttempt := videoQuestion.TotalAttempt
	shouldSkipQuestion := uint(currentAttempt) > maxAttempt
	IsTimeToAnswerLeft := int(videoQuestion.TimeToAnswer)-int(math.Round(math.RoundToEven(time.Since(actualStartAnswerTime).Seconds()))) > 0
	IsTimeToPrepareLeft := int(videoQuestion.TimeToPrepare)-int(math.Round(math.RoundToEven(time.Since(histories[len(histories)-1].StartPrepareTime).Seconds()))) > 0
	timeToAnswerLeft := int(videoQuestion.TimeToAnswer) - int(math.RoundToEven(time.Since(actualStartAnswerTime).Seconds()))
	timeToPrepareLeft := int(videoQuestion.TimeToPrepare) - int(math.RoundToEven(time.Since(histories[len(histories)-1].StartPrepareTime).Seconds()))

	return shouldSkipQuestion, maxAttempt, currentAttempt, IsTimeToAnswerLeft, IsTimeToPrepareLeft, timeToAnswerLeft, timeToPrepareLeft, nil
}

func (r roomHistoryService) UpdateStartAnswerTime(roomID string, questionID uint) error {
	now := time.Now()
	err := r.roomHistoryRepo.UpdateRoomHistory(domains.RoomHistory{
		RoomID:          roomID,
		VideoQuestionID: questionID,
		StartAnswerTime: &now,
	})
	if err != nil {
		return err
	}

	return nil
}
