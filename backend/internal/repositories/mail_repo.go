package repositories

import (
	"github.com/mailjet/mailjet-apiv3-go/v4"
)

type mailRepository struct {
	MAILJET mailjet.Client
}

func NewMailRepository(mailjet mailjet.Client) IMailRepository {
	return &mailRepository{
		MAILJET: mailjet,
	}
}

func (m *mailRepository) Send(messages mailjet.MessagesV31) error {
	_, err := m.MAILJET.SendMailV31(&messages)
	if err != nil {
		return err
	}
	return nil
}
