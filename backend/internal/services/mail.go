package services

import (
	"github.com/gofiber/fiber/v2"
	"time"
)

var (
	ErrorSendMail = fiber.NewError(500, "Error sending mail")
)

type MailPreset string

const (
	Invite MailPreset = "invite"
	Finish MailPreset = "finish"
)

type MailObject struct {
	To      string    `json:"to" validate:"required,email"`
	Name    string    `json:"name" validate:"required"`
	DueDate time.Time `json:"dueDate"`
	Link    string    `json:"link"`
}

type MailListPayload struct {
	Preset   MailPreset   `json:"preset" validate:"required"`
	MailList []MailObject `json:"mailList" validate:"required"`
}

type IMailService interface {
	SendMail(mailListPayload MailListPayload) error
}
