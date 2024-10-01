package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type WorkspaceHandler struct {
	workspaceService    services.IWorkspaceService
	userInPortalService services.IUserInPortalService
	authService         services.IAuthService
}

func NewWorkspaceHandler(workspaceService services.IWorkspaceService, userInPortalService services.IUserInPortalService, authService services.IAuthService) WorkspaceHandler {
	return WorkspaceHandler{
		workspaceService:    workspaceService,
		userInPortalService: userInPortalService,
		authService:         authService,
	}
}

// GetWorkspace
// @ID GetWorkspace
// @Tags workspace
// @Summary Get workspace
// @Accept json
// @Produce json
// @Param payload query GetWorkspaceBody true "GetWorkspaceBody"
// @Success 200 {object} Response[WorkspaceData]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /workspace.get [get]
func (w WorkspaceHandler) GetWorkspaceById(c *fiber.Ctx) error {
	form := GetWorkspaceBody{}
	var res []IndividualUser

	if err := c.QueryParser(&form); err != nil {
		return err
	}

	workspace, userInWorkspace, userData, err := w.workspaceService.GetWorkspaceById(form.Id)
	if err != nil {
		return err
	}
	for index := range *userInWorkspace {
		res = append(res, IndividualUser{
			Id: index,
			UserInWorkspace: UserInWorkspace{
				Id:          (*userInWorkspace)[index].Id,
				UserId:      (*userInWorkspace)[index].UserId,
				WorkspaceId: (*userInWorkspace)[index].WorkspaceId,
				Status:      string((*userInWorkspace)[index].Status),
				IsInterest:  *(*userInWorkspace)[index].IsInterest,
			},
			UserData: UserData{
				ID:        (*userData)[index].ID,
				Name:      (*userData)[index].Name,
				Username:  (*userData)[index].Username,
				Role:      string((*userData)[index].Role),
				CreatedAt: (*userData)[index].CreatedAt,
				UpdatedAt: (*userData)[index].UpdatedAt,
			},
		})
	}
	return Ok(c, WorkspaceData{
		WorkspaceDetail: WorkspaceDetail{
			Id:            workspace.Id,
			Title:         workspace.Title,
			StartDate:     workspace.StartDate,
			EndDate:       workspace.EndDate,
			IsVideo:       *workspace.IsVideo,
			IsCoding:      *workspace.IsCoding,
			CodingTime:    workspace.CodingTime,
			ReqScreen:     *workspace.ReqScreen,
			ReqMicrophone: *workspace.ReqScreen,
			ReqCamera:     *workspace.ReqCamera,
			MemberNum:     0,
		},
		IndividualUser: res,
	})
}

// GetUserInWorkspace
// @ID GetUserInWorkspace
// @Tags userInWorkspace
// @Summary Get user In Workspace
// @Accept json
// @Produce json
// @Param payload query GetWorkspaceBody true "GetWorkspaceBody"
// @Success 200 {object} Response[[]UserInWorkspace]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /userInWorkspace.get [get]
func (w WorkspaceHandler) GetUserInWorkspace(c *fiber.Ctx) error {
	form := GetWorkspaceBody{}

	if err := c.QueryParser(&form); err != nil {
		return err
	}

	response, err := w.workspaceService.GetUserInWorkspace(form.Id)

	if err != nil {
		return err
	}

	return Ok(c, response)
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
	_, portalId, err := w.authService.Me(*userId)
	if err != nil {
		return err
	}

	response, err := w.workspaceService.GetPortalWorkspace(portalId)
	if err != nil {
		return err
	}

	member, err := w.workspaceService.GetUserNumInWorkspace(portalId)
	if err != nil {
		return err
	}
	var res []WorkspaceDetail

	for index, v := range *response {
		res = append(res, WorkspaceDetail{
			Id:        v.Id,
			Title:     v.Title,
			IsVideo:   *v.IsVideo,
			IsCoding:  *v.IsCoding,
			StartDate: v.StartDate,
			EndDate:   v.EndDate,
			PortalId:  v.PortalId,
			MemberNum: member[index],
		})
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

	response, err := w.workspaceService.Create(form.Title, form.StartDate, form.EndDate, form.IsVideo, form.IsCoding, form.CodingTime, form.ReqScreen, form.ReqMicrophone, form.ReqCamera, form.PortalId)
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
