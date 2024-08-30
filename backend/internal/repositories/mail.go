package repositories

import (
	"github.com/mailjet/mailjet-apiv3-go/v4"
)

type IMailRepository interface {
	Send(messages mailjet.MessagesV31) error
}
