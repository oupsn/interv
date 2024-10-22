package services

import (
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type workspaceService struct {
	workspaceRepository       repositories.IWorkspaceRepository
	userInWorkspaceRepository repositories.IUserInWorkspaceRepository
	userRepository            repositories.IUserRepository
	mailService               IMailService
	roomService               IRoomService
	codingInterviewService    ICodingInterviewService
	videoQuestionService      IVideoQuestionService
	videoQuestionRepositories repositories.IVideoQuestionRepository
}

func NewWorkspaceService(
	workspaceRepository repositories.IWorkspaceRepository,
	userInWorkspaceRepository repositories.IUserInWorkspaceRepository,
	userRepository repositories.IUserRepository,
	mailService IMailService,
	roomService IRoomService,
	codingInterviewService ICodingInterviewService,
	videoQuestionService IVideoQuestionService,
	videoQuestionRepositories repositories.IVideoQuestionRepository,
) IWorkspaceService {
	return &workspaceService{
		userInWorkspaceRepository: userInWorkspaceRepository,
		workspaceRepository:       workspaceRepository,
		userRepository:            userRepository,
		mailService:               mailService,
		roomService:               roomService,
		codingInterviewService:    codingInterviewService,
		videoQuestionService:      videoQuestionService,
		videoQuestionRepositories: videoQuestionRepositories,
	}
}

func (w *workspaceService) GetWorkspaceById(id uint) (workspace *domains.Workspace, candidate *[]domains.UserInWorkspace, err error) {
	workspace, err = w.videoQuestionRepositories.GetByWorkspaceId(id)
	if err != nil {
		return nil, nil, err
	}
	candidate, err = w.userInWorkspaceRepository.FindByWorkspaceId(id)
	if err != nil {
		return nil, nil, err
	}
	return workspace, candidate, nil
}

func (w *workspaceService) InterestUser(workspaceId uint, candidateId uint, interest *bool) error {
	return w.userInWorkspaceRepository.InterestUser(workspaceId, candidateId, interest)
}

func (w *workspaceService) GetPortalWorkspace(portalId *uint) (workspace *[]domains.Workspace, err error) {
	return w.workspaceRepository.FindByPortalId(portalId)
}

func (w *workspaceService) GetIndividualUser(workspaceId uint, userId uint) (userInworkspace *domains.UserInWorkspace, err error) {
	userInworkspace, err = w.userInWorkspaceRepository.FindByUserIdAndWorkspaceId(userId, workspaceId)
	if err != nil {
		return nil, err
	}
	return userInworkspace, nil
}

func (w *workspaceService) Create(
	title string,
	startDate string,
	endDate string,
	isVideo *bool,
	isCoding *bool,
	videoTime uint,
	codingTime uint,
	reqScreen *bool,
	reqMicrophone *bool,
	reqCamera *bool,
	portalId uint,
	codeQuestion []uint,
	videoQuestion []uint,
) (workspace *domains.Workspace, err error) {
	const layout = "2006-01-02T15:04:05Z07:00"
	if _, err := w.workspaceRepository.FindByTitle(strings.TrimSpace(title)); err == nil {
		return nil, ErrorWorkspaceExists
	}
	startdate, err := time.Parse(layout, startDate)
	if err != nil {
		return nil, err
	}
	enddate, err := time.Parse(layout, endDate)
	if err != nil {
		return nil, err
	}
	newWorkspace, err := w.workspaceRepository.Create(domains.Workspace{
		Title:         strings.TrimSpace(title),
		StartDate:     startdate,
		EndDate:       enddate,
		IsVideo:       isVideo,
		IsCoding:      isCoding,
		VideoTime:     videoTime,
		CodingTime:    codingTime,
		ReqScreen:     reqScreen,
		ReqMicrophone: reqMicrophone,
		ReqCamera:     reqCamera,
		PortalId:      portalId,
	})
	if len(codeQuestion) > 0 {
		for index := range codeQuestion {
			w.codingInterviewService.AddCodingQuestion(codeQuestion[index], "workspace", newWorkspace.Id)
		}
	}
	if len(videoQuestion) > 0 {
		w.videoQuestionService.AddVideoQuestion(videoQuestion, newWorkspace)
	}

	return newWorkspace, err
}

func (w *workspaceService) Update(
	id uint,
	title string,
	startDate string,
	endDate string,
	isVideo *bool,
	isCoding *bool,
	videoTime uint,
	codingTime uint,
	reqScreen *bool,
	reqMicrophone *bool,
	reqCamera *bool,
	portalId uint,
	codeQuestion []uint,
	videoQuestion []uint,
) (workspace *domains.Workspace, err error) {
	const layout = "2006-01-02T15:04:05Z07:00"
	startdate, err := time.Parse(layout, startDate)
	if err != nil {
		return nil, err
	}
	enddate, err := time.Parse(layout, endDate)
	if err != nil {
		return nil, err
	}

	w.videoQuestionRepositories.DeleteByWorkspaceId(id)
	w.codingInterviewService.DeleteCodingQuestionInWorkspace(id)

	workspace, err = w.workspaceRepository.Update(domains.Workspace{
		Id:            id,
		Title:         title,
		StartDate:     startdate,
		EndDate:       enddate,
		IsVideo:       isVideo,
		IsCoding:      isCoding,
		VideoTime:     videoTime,
		CodingTime:    codingTime,
		ReqScreen:     reqScreen,
		ReqMicrophone: reqMicrophone,
		ReqCamera:     reqCamera,
		PortalId:      portalId,
	})
	if err != nil {
		return nil, err
	}
	if len(codeQuestion) > 0 {
		for index := range codeQuestion {
			w.codingInterviewService.AddCodingQuestion(codeQuestion[index], "workspace", workspace.Id)
		}
	}
	if len(videoQuestion) > 0 {
		w.videoQuestionService.AddVideoQuestion(videoQuestion, workspace)
	}

	response, err := w.workspaceRepository.FindById(id)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (w *workspaceService) Delete(id uint) (err error) {
	return w.workspaceRepository.DeleteById(id)
}

func (w *workspaceService) DeleteUserInWorkspace(userId uint, workspaceId uint) (err error) {
	return w.userInWorkspaceRepository.DeleteByUserIdAndWorkspaceId(userId, workspaceId)
}

func (w *workspaceService) InviteAllCandidate(workspaceId uint) (err error) {
	workspace, err := w.workspaceRepository.FindById(workspaceId)
	if err != nil {
		return err
	}

	var mailList []MailObject
	var IsCodingDone = !*workspace.IsCoding
	var IsVideoDone = !*workspace.IsVideo

	for _, u := range workspace.UserInWorkspace {
		if err != nil {
			return err
		}
		if u.Status == "idle" {
			room, rt, err := w.roomService.CreateRoom(domains.Room{CandidateID: u.UserId, WorkspaceID: workspaceId, IsCodingDone: &IsCodingDone, IsVideoDone: &IsVideoDone})
			if err != nil {
				return err
			}
			user, err := w.userRepository.FindById(u.UserId)
			if err != nil {
				return err
			}
			mailList = append(mailList, MailObject{
				To:      user.Username,
				Name:    user.Name,
				DueDate: workspace.EndDate,
				RoomId:  room.ID + "?rt=" + rt,
			})
		}

	}

	if mailList == nil {
		return fiber.NewError(fiber.StatusBadRequest, "No candidate to invite")
	}

	mailPayload := MailListPayload{
		Preset:   Invite,
		MailList: mailList,
	}

	if err := w.mailService.SendMail(mailPayload); err != nil {
		return err
	}

	return nil
}

func (w *workspaceService) UpdateStatusCandidate(workspaceId uint, status string) (err error) {
	err = w.userInWorkspaceRepository.UpdateStatusCandidate(workspaceId, status)
	if err != nil {
		return err
	}
	return nil
}
