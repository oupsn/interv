package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"time"
)

type IRoomHistoryService interface {
	AddRoomHistory(domains.RoomHistory) (*domains.Room, error)
	GetRoomHistory(roomID string, questionID uint) (bool, uint, int, error)
	// UpdateStartAnswerTime(roomID string, questionID uint) error
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
	histories, err := r.roomHistoryRepo.GetHistoryByRoomIdAndQuestionId(room.RoomID, room.VideoQuestionID)
	if err != nil {
		return nil, err
	}

	history, err := r.roomHistoryRepo.CreateHistory(domains.RoomHistory{
		RoomID:          room.RoomID,
		VideoQuestionID: room.VideoQuestionID,
		StartTime:       time.Now(),
		AttemptNo:       len(histories) + 1,
	})
	if err != nil {
		return nil, err
	}

	return &history.Room, nil
}

func (r roomHistoryService) GetRoomHistory(roomID string, questionID uint) (bool, uint, int, error) {
	videoQuestion, err := r.videoQuestionRepo.GetById(questionID)
	if err != nil {
		return false, 0, 0, err
	}

	histories, err := r.roomHistoryRepo.GetHistoryByRoomIdAndQuestionId(roomID, questionID)
	if err != nil {
		return false, 0, 0, err
	}

	currentAttemptLeft := int(videoQuestion.TotalAttempt) - len(histories)
	maxAttempt := videoQuestion.TotalAttempt
	shouldSkipQuestion := len(histories) >= int(videoQuestion.TotalAttempt)

	return shouldSkipQuestion, maxAttempt, currentAttemptLeft, nil
}
