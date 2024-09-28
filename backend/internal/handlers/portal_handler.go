package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type PortalHandler struct {
	portalService services.IPortalService
}

func NewPortalHandler(portalService services.IPortalService) PortalHandler {
	return PortalHandler{
		portalService: portalService,
	}
}

// GetPortalById
// @ID GetPortalById
// @Tags portal
// @Summary Get portal
// @Accept json
// @Produce json
// @Param payload query GetPortalBody true "GetPortalBody"
// @Success 200 {object} Response[PortalData]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /portal.get [get]
func (p PortalHandler) GetPortalById(c *fiber.Ctx) error {
	form := GetPortalBody{}

	if err := c.QueryParser(&form); err != nil {
		return err
	}

	portal, err := p.portalService.GetPortalById(form.Id)
	if err != nil {
		return err
	}

	return Ok(c, portal)
}

// CreatePortal
// @ID CreatePortal
// @Tags portal
// @Summary Create new portal
// @Accept json
// @Produce json
// @Param payload body CreatePortalBody true "CreatePortalBody"
// @Success 200 {object} Response[PortalData]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /portal.create [post]
func (p PortalHandler) CreatePortal(c *fiber.Ctx) error {
	form := new(CreatePortalBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := validate.Struct(form); err != nil {
		return err
	}

	response, err := p.portalService.Create(form.CompanyName)
	if err != nil {
		return err
	}

	return Created(c, PortalData{
		Id:          response.Id,
		CompanyName: response.CompanyName,
	})
}

// DeletePortalById
// @ID DeletePortalById
// @Tags portal
// @Summary Delete portal By Id
// @Accept json
// @Produce json
// @Param payload body DeletePortalBody true "DeletePortalBody"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /portal.delete [post]
func (p PortalHandler) DeletePortalById(c *fiber.Ctx) error {
	form := new(DeletePortalBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := p.portalService.Delete(form.Id); err != nil {
		return err
	}

	return Ok(c, form.Id)
}
