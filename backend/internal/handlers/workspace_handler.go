package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type WorkspaceHandler struct {
	workspaceService services.IWorkspaceService
	authService      services.IAuthService
}

func NewWorkspaceHandler(workspaceService services.IWorkspaceService, authService services.IAuthService) WorkspaceHandler {
	return WorkspaceHandler{
		workspaceService: workspaceService,
		authService:      authService,
	}
}

// GetWorkspace
// @ID GetWorkspace
// @Tags workspace
// @Summary Get workspace
// @Accept json
// @Produce json
// @Param payload query GetWorkspaceBody true "GetWorkspaceBody"
// @Success 200 {object} Response[WorkspaceDetail]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.get [get]
func (w WorkspaceHandler) GetWorkspaceById(c *fiber.Ctx) error {
	form := GetWorkspaceBody{}
	var res []UserInWorkspace
	var vidQ []VideoQuestionDetail

	if err := c.QueryParser(&form); err != nil {
		return err
	}

	workspace, candidate, err := w.workspaceService.GetWorkspaceById(form.Id)
	if err != nil {
		return err
	}
	member := len(*candidate)
	for index := range *candidate {
		res = append(res, UserInWorkspace{
			Id:          (*candidate)[index].Id,
			UserId:      (*candidate)[index].UserId,
			WorkspaceId: (*candidate)[index].WorkspaceId,
			Name:        (*candidate)[index].User.Name,
			Username:    (*candidate)[index].User.Username,
			Role:        string((*candidate)[index].User.Role),
			Status:      string((*candidate)[index].Status),
			IsInterest:  *(*candidate)[index].IsInterest,
		})
	}

	for _, question := range workspace.VideoQuestion {
		vidQ = append(vidQ, VideoQuestionDetail{
			ID:            question.ID,
			PortalID:      question.PortalID,
			Title:         question.Title,
			TimeToPrepare: question.TimeToPrepare,
			TimeToAnswer:  question.TimeToAnswer,
			TotalAttempt:  question.TotalAttempt,
		})
	}

	return Ok(c, WorkspaceDetail{
		Id:              workspace.Id,
		Title:           workspace.Title,
		StartDate:       workspace.StartDate,
		EndDate:         workspace.EndDate,
		IsVideo:         *workspace.IsVideo,
		IsCoding:        *workspace.IsCoding,
		VideoTime:       workspace.VideoTime,
		CodingTime:      workspace.CodingTime,
		ReqScreen:       *workspace.ReqScreen,
		ReqMicrophone:   *workspace.ReqScreen,
		ReqCamera:       *workspace.ReqCamera,
		PortalId:        workspace.PortalId,
		MemberNum:       uint(member),
		CreateAt:        workspace.CreatedAt,
		VideoQueston:    vidQ,
		UserInWorkspace: res,
	})
}

// GetIndividualUser
// @ID GetIndividualUser
// @Tags userInWorkspace
// @Summary Get Individual User In Workspace
// @Accept json
// @Produce json
// @Param payload query GetIndividualUserBody true "GetIndividualUserBody"
// @Success 200 {object} Response[UserInWorkspace]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /userInWorkspace.getbyId [get]
func (w WorkspaceHandler) GetIndividualUser(c *fiber.Ctx) error {
	form := GetIndividualUserBody{}
	if err := c.QueryParser(&form); err != nil {
		return err
	}
	userInWorkspace, err := w.workspaceService.GetIndividualUser(form.WorkspaceId, form.UserId)

	if err != nil {
		return err
	}

	return Ok(c, UserInWorkspace{
		Id:          userInWorkspace.Id,
		UserId:      userInWorkspace.UserId,
		WorkspaceId: userInWorkspace.WorkspaceId,
		Name:        userInWorkspace.User.Name,
		Username:    userInWorkspace.User.Username,
		Role:        string(userInWorkspace.User.Role),
		Status:      string(userInWorkspace.Status),
		IsInterest:  *userInWorkspace.IsInterest,
	})
}

// InterestUser
// @ID InterestUser
// @Tags userInWorkspace
// @Summary Interest User In Workspace
// @Accept json
// @Produce json
// @Param payload query InterestUser true "InterestUser"
// @Success 200 {object} Response[UserInWorkspace]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /userInWorkspace.interest [patch]
func (w WorkspaceHandler) InterestUser(c *fiber.Ctx) error {
	form := InterestUser{}

	if err := c.QueryParser(&form); err != nil {
		return err
	}

	err := w.workspaceService.InterestUser(form.WorkspaceId, form.UserId, &form.IsInterest)

	if err != nil {
		return err
	}

	return Ok(c, err)
}

// GetPortalWorkspace
// @ID GetPortalWorkspace
// @Tags workspace
// @Summary Get List of workspace
// @Accept json
// @Produce json
// @Success 200 {object} Response[[]WorkspaceDetail]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.getByPortal [get]
func (w WorkspaceHandler) GetPortalWorkspace(c *fiber.Ctx) error {
	userId, err := GetCurrentUser(c)
	if err != nil {
		return err
	}
	_, portalId, err := w.authService.Me(*userId)
	if err != nil {
		return err
	}

	response, err := w.workspaceService.GetPortalWorkspace(portalId)
	if err != nil {
		return err
	}

	var res []WorkspaceDetail
	var user []UserInWorkspace

	for _, x := range *response {
		for _, y := range x.UserInWorkspace {
			user = append(user, UserInWorkspace{
				Id:          y.Id,
				UserId:      y.UserId,
				WorkspaceId: y.WorkspaceId,
				Name:        y.User.Name,
				Username:    y.User.Username,
				Role:        string(y.User.Role),
				Status:      string(y.Status),
				IsInterest:  *y.IsInterest,
			})
		}
		res = append(res, WorkspaceDetail{
			Id:              x.Id,
			Title:           x.Title,
			IsVideo:         *x.IsVideo,
			IsCoding:        *x.IsCoding,
			VideoTime:       x.VideoTime,
			CodingTime:      x.CodingTime,
			StartDate:       x.StartDate,
			EndDate:         x.EndDate,
			PortalId:        x.PortalId,
			MemberNum:       uint(len(x.UserInWorkspace)),
			CreateAt:        x.CreatedAt,
			UserInWorkspace: user,
		})
		user = []UserInWorkspace{}
	}

	return Ok(c, res)
}

// CreateWorkspace
// @ID CreateWorkspace
// @Tags workspace
// @Summary Create new workspace
// @Accept json
// @Produce json
// @Param payload body CreateWorkspaceBody true "CreateWorkspaceBody"
// @Success 200 {object} Response[WorkspaceDetail]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.create [post]
func (w WorkspaceHandler) CreateWorkspace(c *fiber.Ctx) error {
	form := new(CreateWorkspaceBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := validate.Struct(form); err != nil {
		return err
	}

	response, err := w.workspaceService.Create(form.Title, form.StartDate, form.EndDate, form.IsVideo, form.IsCoding, form.VideoTime, form.CodingTime, form.ReqScreen, form.ReqMicrophone, form.ReqCamera, form.PortalId, form.CodeQuestion, form.VideoQuestion)
	if err != nil {
		return err
	}

	return Created(c, WorkspaceDetail{
		Id:         response.Id,
		Title:      response.Title,
		StartDate:  response.StartDate,
		EndDate:    response.EndDate,
		IsVideo:    *response.IsVideo,
		IsCoding:   *response.IsCoding,
		VideoTime:  response.VideoTime,
		CodingTime: response.CodingTime,
		PortalId:   response.PortalId,
	})
}

// UpdateWorkspace
// @ID UpdateWorkspace
// @Tags workspace
// @Summary Update workspace
// @Accept json
// @Produce json
// @Param payload body UpdateWorkspaceBody true "UpdateWorkspaceBody"
// @Success 200 {object} Response[WorkspaceDetail]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.update [put]
func (w WorkspaceHandler) UpdateWorkspace(c *fiber.Ctx) error {
	form := new(UpdateWorkspaceBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := validate.Struct(form); err != nil {
		return err
	}

	response, err := w.workspaceService.Update(form.Id, form.Title, form.StartDate, form.EndDate, form.IsVideo, form.IsCoding, form.VideoTime, form.CodingTime, form.ReqScreen, form.ReqMicrophone, form.ReqCamera, form.PortalId, form.CodeQuestion, form.VideoQuestion)
	if err != nil {
		return err
	}

	return Created(c, WorkspaceDetail{
		Id:         response.Id,
		Title:      response.Title,
		StartDate:  response.StartDate,
		EndDate:    response.EndDate,
		IsVideo:    *response.IsVideo,
		IsCoding:   *response.IsCoding,
		VideoTime:  response.VideoTime,
		CodingTime: response.CodingTime,
		PortalId:   response.PortalId,
	})
}

// DeleteWorkspaceById
// @ID DeleteWorkspaceById
// @Tags workspace
// @Summary Delete workspace By Id
// @Accept json
// @Produce json
// @Param payload body DeleteWorkspaceBody true "DeleteWorkspaceBody"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.delete [post]
func (w WorkspaceHandler) DeleteWorkspaceById(c *fiber.Ctx) error {
	form := new(DeleteWorkspaceBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := w.workspaceService.Delete(form.Id); err != nil {
		return err
	}

	return Ok(c, form.Id)
}

// DeleteUserFromWorkspace
// @ID DeleteUserFromWorkspace
// @Tags userInWorkspace
// @Summary Delete User From Workspace
// @Accept json
// @Produce json
// @Param payload body DeleteUserFromWorkspaceBody true "DeleteUserFromWorkspaceBody"
// @Success 200 {object} Response[UserInWorkspace]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /userInWorkspace.delete [delete]
func (w WorkspaceHandler) DeleteUserFromWorkspace(c *fiber.Ctx) error {
	body := DeleteUserFromWorkspaceBody{}

	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := w.workspaceService.DeleteUserInWorkspace(body.UserId, body.WorkspaceId); err != nil {
		return err
	}

	return Ok(c, body.UserId, body.WorkspaceId)
}

// InviteAllCandidate
// @ID inviteAllCandidate
// @Tags workspace
// @Accept json
// @Produce json
// @Param payload body InviteAllCandidateBody true "InviteAllCandidateBody"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.inviteAllCandidate [post]
func (w WorkspaceHandler) InviteAllCandidate(c *fiber.Ctx) error {
	body := InviteAllCandidateBody{}

	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := w.workspaceService.InviteAllCandidate(body.WorkspaceId); err != nil {
		return err
	}
	if err := w.workspaceService.GetUnseenCandidate(body.WorkspaceId); err != nil {
		return err
	}

	return Ok(c, "Invitation email sent successfully")
}
