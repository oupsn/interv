package handlers

import "time"

type CreateVideoQuestionBody struct {
	Title         string `json:"title" validate:"required"`
	PortalID      uint   `json:"portalId" validate:"required"`
	TimeToPrepare uint   `json:"timeToPrepare" validate:"required"`
	TimeToAnswer  uint   `json:"timeToAnswer" validate:"required"`
	TotalAttempt  uint   `json:"totalAttempt" validate:"required"`
} // @name CreateVideoQuestionBody

type CreateVideoQuestionResponse struct {
	ID            uint      `json:"id"`
	Title         string    `json:"title"`
	TimeToPrepare uint      `json:"timeToPrepare"`
	TimeToAnswer  uint      `json:"timeToAnswer"`
	TotalAttempt  uint      `json:"totalAttempt"`
	PortalID      uint      `json:"portalId"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
} // @name CreateVideoQuestionResponse

type GetVideoQuestionByIdParam struct {
	ID uint `json:"id" validate:"required"`
} // @name GetVideoQuestionByIdParam

type GetVideoQuestionByIdResponse struct {
	ID            uint      `json:"id"`
	Title         string    `json:"title"`
	TimeToPrepare uint      `json:"timeToPrepare"`
	TimeToAnswer  uint      `json:"timeToAnswer"`
	TotalAttempt  uint      `json:"totalAttempt"`
	PortalID      uint      `json:"portalId"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
} // @name GetVideoQuestionByIdResponse

type GetVideoQuestionByPortalIdParam struct {
	ID uint `json:"id" validate:"required"`
} // @name GetVideoQuestionByPortalIdParam

type GetVideoQuestionByPortalIdResponse struct {
	ID            uint      `json:"id"`
	Title         string    `json:"title"`
	TimeToPrepare uint      `json:"timeToPrepare"`
	TimeToAnswer  uint      `json:"timeToAnswer"`
	TotalAttempt  uint      `json:"totalAttempt"`
	PortalID      uint      `json:"portalId"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
} // @name GetVideoQuestionByPortalIdResponse

type UpdateVideoQuestionBody struct {
	QuestionID    uint   `json:"questionId" validate:"required"`
	Title         string `json:"title"`
	TimeToPrepare uint   `json:"timeToPrepare"`
	TimeToAnswer  uint   `json:"timeToAnswer"`
	TotalAttempt  uint   `json:"totalAttempt"`
	PortalID      uint   `json:"portalId"`
} // @name UpdateVideoQuestionBody

type UpdateVideoQuestionResponse struct {
	ID            uint   `json:"id"`
	Title         string `json:"title"`
	TimeToPrepare uint   `json:"timeToPrepare"`
	TimeToAnswer  uint   `json:"timeToAnswer"`
	TotalAttempt  uint   `json:"totalAttempt"`
	PortalID      uint   `json:"portalId"`
} // @name UpdateVideoQuestionResponse

type DeleteVideoQuestionByIdBody struct {
	ID uint `json:"id" validate:"required"`
} // @name DeleteVideoQuestionByIdBody
