package handlers

import "time"

type MailPreset string

const (
	Invite MailPreset = "invite"
	Finish MailPreset = "finish"
) // @name MailPreset

type MailObject struct {
	To      string    `json:"to" validate:"required,email"`
	Name    string    `json:"name" validate:"required"`
	DueDate time.Time `json:"dueDate"`
	Link    string    `json:"link"`
} // @name MailObject

type SendMailBody struct {
	Preset   MailPreset   `json:"preset" validate:"required"`
	MailList []MailObject `json:"mailList" validate:"required"`
} // @name SendMailBody
