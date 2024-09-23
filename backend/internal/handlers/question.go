package handlers

import "time"

type CreateVideoQuestionBody struct {
	Title         string `json:"title" validate:"required"`
	WorkspaceID   uint   `json:"workspaceId" validate:"required"`
	TimeToPrepare uint   `json:"timeToPrepare" validate:"required"`
	TimeToAnswer  uint   `json:"timeToAnswer" validate:"required"`
	RetryAmount   uint   `json:"retryAmount" validate:"required"`
} // @name CreateVideoQuestionBody

type CreateVideoQuestionResponse struct {
	ID            uint      `json:"id"`
	Title         string    `json:"title"`
	TimeToPrepare uint      `json:"timeToPrepare"`
	TimeToAnswer  uint      `json:"timeToAnswer"`
	RetryAmount   uint      `json:"retryAmount"`
	WorkspaceID   uint      `json:"workspaceId"`
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
	RetryAmount   uint      `json:"retryAmount"`
	WorkspaceID   uint      `json:"workspaceId"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
} // @name GetVideoQuestionByIdResponse

type GetVideoQuestionByWorkspaceIdParam struct {
	ID uint `json:"id" validate:"required"`
} // @name GetVideoQuestionByWorkspaceIdParam

type GetVideoQuestionByWorkspaceIdResponse struct {
	ID            uint      `json:"id"`
	Title         string    `json:"title"`
	TimeToPrepare uint      `json:"timeToPrepare"`
	TimeToAnswer  uint      `json:"timeToAnswer"`
	RetryAmount   uint      `json:"retryAmount"`
	WorkspaceID   uint      `json:"workspaceId"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
} // @name GetVideoQuestionByWorkspaceIdResponse

type UpdateVideoQuestionBody struct {
	ID            uint   `json:"id" validate:"required"`
	Title         string `json:"title"`
	TimeToPrepare uint   `json:"timeToPrepare"`
	TimeToAnswer  uint   `json:"timeToAnswer"`
	RetryAmount   uint   `json:"retryAmount"`
	WorkspaceID   uint   `json:"workspaceId"`
} // @name UpdateVideoQuestionBody

type UpdateVideoQuestionResponse struct {
	ID            uint   `json:"id"`
	Title         string `json:"title"`
	TimeToPrepare uint   `json:"timeToPrepare"`
	TimeToAnswer  uint   `json:"timeToAnswer"`
	RetryAmount   uint   `json:"retryAmount"`
	WorkspaceID   uint   `json:"workspaceId"`
} // @name UpdateVideoQuestionResponse

type DeleteVideoQuestionByIdBody struct {
	ID uint `json:"id" validate:"required"`
} // @name DeleteVideoQuestionByIdBody
