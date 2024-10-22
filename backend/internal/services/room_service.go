package services

import (
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/cryptone"
	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
)

var (
	ErrorGetRoomContext = fiber.NewError(fiber.StatusInternalServerError, "error getting room context")
)

type IRoomService interface {
	CreateRoom(room domains.Room) (*domains.Room, string, error)
	GetRoomContext(roomId string) (*domains.Room, *domains.User, uint, uint, uint, uint, *time.Time, error)
	UpdateRoomContext(room domains.Room) error
	RevokeRoomSession(roomId string) error
	ExtendRoomSession(roomId string, sessionIdentifier string) error
	GetRoomSession(roomId string) (string, error)
	SetRoomSession(roomId string, sessionIdentifier string) error
}

type roomService struct {
	roomRepo            repositories.IRoomRepository
	userRepo            repositories.IUserRepository
	videoQuestionRepo   repositories.IVideoQuestionRepository
	codingInterviewRepo repositories.ICodingInterviewRepository
	workspaceRepo       repositories.IWorkspaceRepository
	userInWorkspace     repositories.IUserInWorkspaceRepository
}

func NewRoomService(roomRepo repositories.IRoomRepository, userRepo repositories.IUserRepository, videoQuestionRepo repositories.IVideoQuestionRepository, codingInterviewRepo repositories.ICodingInterviewRepository, workspaceRepo repositories.IWorkspaceRepository, userInWorkspace repositories.IUserInWorkspaceRepository) IRoomService {
	return &roomService{
		roomRepo:            roomRepo,
		userRepo:            userRepo,
		videoQuestionRepo:   videoQuestionRepo,
		codingInterviewRepo: codingInterviewRepo,
		workspaceRepo:       workspaceRepo,
	}
}

func (l roomService) CreateRoom(room domains.Room) (*domains.Room, string, error) {
	createdRoom, err := l.roomRepo.Create(room)
	if err != nil {
		return nil, "", err
	}

	token, err := cryptone.EncryptAES([]byte(viper.GetString("RT")), createdRoom.ID)
	if err != nil {
		return nil, "", err
	}

	return createdRoom, token, nil
}

func (l roomService) GetRoomContext(roomId string) (*domains.Room, *domains.User, uint, uint, uint, uint, *time.Time, error) {
	room, err := l.roomRepo.GetById(roomId)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, nil, ErrorGetRoomContext
	}

	workspace, err := l.videoQuestionRepo.GetByWorkspaceId(room.WorkspaceID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, nil, ErrorGetRoomContext
	}

	var videoQuestion []domains.VideoQuestion
	for _, v := range workspace.VideoQuestion {
		videoQuestion = append(videoQuestion, *v)
	}

	var videoQuestionTotalTime uint
	for _, v := range videoQuestion {
		videoQuestionTotalTime += v.TimeToPrepare + v.TimeToAnswer
	}

	codingQuestion, err := l.codingInterviewRepo.GetCodingQuestionByWorkspaceID(int(room.WorkspaceID))
	if err != nil {
		return nil, nil, 0, 0, 0, 0, nil, err
	}

	candidate, err := l.userRepo.FindById(room.CandidateID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, nil, err
	}

	workspace, err = l.workspaceRepo.FindById(room.WorkspaceID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, nil, err
	}

	if err := l.userInWorkspace.UpdateStatusCandidate(room.WorkspaceID, "pending"); err != nil {
		return nil, nil, 0, 0, 0, 0, nil, err
	}

	return room, candidate, uint(len(videoQuestion)), videoQuestionTotalTime, uint(len(codingQuestion)), workspace.CodingTime, &workspace.EndDate, nil
}

func (l roomService) UpdateRoomContext(room domains.Room) error {
	if err := l.roomRepo.Update(room); err != nil {
		return err
	}
	if room.IsCodingDone != nil && room.IsVideoDone != nil && *room.IsCodingDone && *room.IsVideoDone {
		err := l.userInWorkspace.UpdateStatusCandidate(room.WorkspaceID, "success")
		if err != nil {
			return err
		}
	}

	return nil
}

func (l roomService) RevokeRoomSession(roomId string) error {
	if err := l.roomRepo.RevokeRoomSession(roomId); err != nil {
		return err
	}

	return nil
}

func (l roomService) ExtendRoomSession(roomId string, sessionIdentifier string) error {
	if err := l.roomRepo.SetRoomSession(roomId, sessionIdentifier); err != nil {
		return err
	}

	return nil
}

func (l roomService) GetRoomSession(roomId string) (string, error) {
	session, err := l.roomRepo.GetRoomSession(roomId)
	if err != nil {
		return "", err
	}

	return session, nil
}

func (l roomService) SetRoomSession(roomId string, sessionIdentifier string) error {
	if err := l.roomRepo.SetRoomSession(roomId, sessionIdentifier); err != nil {
		return err
	}

	return nil
}
