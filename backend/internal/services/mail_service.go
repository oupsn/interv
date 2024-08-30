package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/mail"
	"github.com/gofiber/fiber/v2"
	"github.com/mailjet/mailjet-apiv3-go/v4"
)

type mailService struct {
	mailRepository repositories.IMailRepository
}

func NewMailService(mailRepository repositories.IMailRepository) IMailService {
	return &mailService{
		mailRepository: mailRepository,
	}
}

func (m *mailService) SendMail(mailListPayload MailListPayload) error {
	var messagesInfo []mailjet.InfoMessagesV31

	for _, v := range mailListPayload.MailList {
		var mailContent string
		var subject string

		switch mailListPayload.Preset {
		case Invite:
			mailContent = mail.BuildInviteMail(v.Name, v.DueDate, v.Link)
			subject = "Invitation To Interview"
		case Finish:
			mailContent = mail.BuildFinishMail()
			subject = "Your Interview Is All Done"
		default:
			return fiber.NewError(fiber.StatusBadRequest, "Invalid preset type")
		}

		messagesInfo = append(messagesInfo, mailjet.InfoMessagesV31{
			From: &mailjet.RecipientV31{
				Email: "no-reply@interv.oupsn.com",
				Name:  "Interv",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31{
					Email: v.To,
					Name:  v.Name,
				},
			},
			Subject:  subject,
			TextPart: mailContent,
			HTMLPart: mailContent,
		})
	}

	messages := mailjet.MessagesV31{Info: messagesInfo}
	if err := m.mailRepository.Send(messages); err != nil {
		return ErrorSendMail
	}

	return nil
}
