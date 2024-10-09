package services

import (
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
	GetRoomContext(roomId string, rt string) (*domains.Room, *domains.User, uint, uint, uint, uint, error)
	UpdateRoomContext(room domains.Room) error
}

type roomService struct {
	roomRepo            repositories.IRoomRepository
	userRepo            repositories.IUserRepository
	videoQuestionRepo   repositories.IVideoQuestionRepository
	codingInterviewRepo repositories.ICodingInterviewRepository
	workspaceRepo       repositories.IWorkspaceRepository
}

func NewRoomService(roomRepo repositories.IRoomRepository, userRepo repositories.IUserRepository, videoQuestionRepo repositories.IVideoQuestionRepository, codingInterviewRepo repositories.ICodingInterviewRepository, workspaceRepo repositories.IWorkspaceRepository) IRoomService {
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

func (l roomService) GetRoomContext(roomId string, rt string) (*domains.Room, *domains.User, uint, uint, uint, uint, error) {
	token, err := cryptone.DecryptAES([]byte(viper.GetString("RT")), rt)

	if token != roomId {
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
	}

	room, err := l.roomRepo.GetById(roomId)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
	}

	workspace, err := l.videoQuestionRepo.GetByWorkspaceId(room.WorkspaceID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
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
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
	}

	candidate, err := l.userRepo.FindById(room.CandidateID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
	}

	workspace, err = l.workspaceRepo.FindById(room.WorkspaceID)
	if err != nil {
		return nil, nil, 0, 0, 0, 0, ErrorGetRoomContext
	}

	return room, candidate, uint(len(videoQuestion)), videoQuestionTotalTime, uint(len(codingQuestion)), workspace.CodingTime, nil
}

func (l roomService) UpdateRoomContext(room domains.Room) error {
	if err := l.roomRepo.Update(room); err != nil {
		return err
	}

	return nil
}
