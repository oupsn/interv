package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type MailHandler struct {
	mailService services.IMailService
}

func NewMailHandler(mailService services.IMailService) MailHandler {
	return MailHandler{
		mailService: mailService,
	}
}

// SendMail
// @ID sendMail
// @Tags mail
// @Summary Send mail to the user
// @Accept json
// @Produce json
// @Param payload body SendMailBody true "Mail details"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /mail.sendMail [post]
func (m *MailHandler) SendMail(c *fiber.Ctx) error {
	body := SendMailBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}
	if err := validate.Struct(body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	mailList := []services.MailObject{}
	for _, v := range body.MailList {
		mailList = append(mailList, services.MailObject{
			To:      v.To,
			Name:    v.Name,
			DueDate: v.DueDate,
			Link:    v.Link,
		})
	}
	mailPayload := services.MailListPayload{
		Preset:   services.MailPreset(body.Preset),
		MailList: mailList,
	}

	if err := m.mailService.SendMail(mailPayload); err != nil {
		return err
	}

	return Ok(c, "Mail sent successfully")
}
