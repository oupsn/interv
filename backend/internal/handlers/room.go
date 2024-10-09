package handlers

import "time"

type CreateRoomBody struct {
	CandidateID  uint      `json:"candidateId"  validate:"required"`
	IsVideoDone  *bool     `json:"isVideoDone"  validate:"required"`
	IsCodingDone *bool     `json:"isCodingDone"  validate:"required"`
	DueDate      time.Time `json:"dueDate"  validate:"required"`
} // @name CreateRoomBody

type CreateRoomResponse struct {
	RoomID              string    `json:"roomId"  validate:"required"`
	CandidateID         uint      `json:"candidateId"  validate:"required"`
	TotalVideoTime      uint      `json:"totalVideoTime"  validate:"required"`
	TotalCodingTime     uint      `json:"totalCodingTime"  validate:"required"`
	TotalVideoQuestion  uint      `json:"totalVideoQuestion"  validate:"required"`
	TotalCodingQuestion uint      `json:"totalCodingQuestion"  validate:"required"`
	IsVideoDone         *bool     `json:"isVideoDone"  validate:"required"`
	IsCodingDone        *bool     `json:"isCodingDone"  validate:"required"`
	DueDate             time.Time `json:"dueDate"  validate:"required"`
} // @name CreateRoomResponse

type GetRoomContextQuery struct {
	RoomID string `json:"roomId"  validate:"required"`
	Rt     string `json:"rt"  validate:"required"`
} // @name GetRoomContextQuery

type GetRoomContextResponse struct {
	RoomID              string    `json:"roomId"  validate:"required"`
	CandidateID         uint      `json:"candidateId"  validate:"required"`
	CandidateName       string    `json:"candidateName"  validate:"required"`
	TotalVideoTime      uint      `json:"totalVideoTime"  validate:"required"`
	TotalCodingTime     uint      `json:"totalCodingTime"  validate:"required"`
	TotalVideoQuestion  uint      `json:"totalVideoQuestion"  validate:"required"`
	TotalCodingQuestion uint      `json:"totalCodingQuestion"  validate:"required"`
	IsVideoDone         bool      `json:"isVideoDone"  validate:"required"`
	IsCodingDone        bool      `json:"isCodingDone"  validate:"required"`
	DueDate             time.Time `json:"dueDate"  validate:"required"`
	IsOverdue           bool      `json:"isOverdue"  validate:"required"`
} // @name GetRoomContextResponse

type UpdateRoomContextBody struct {
	RoomID              string    `json:"roomId"  validate:"required"`
	CandidateID         uint      `json:"candidateId"`
	TotalVideoTime      uint      `json:"totalVideoTime"`
	TotalCodingTime     uint      `json:"totalCodingTime"`
	TotalVideoQuestion  uint      `json:"totalVideoQuestion"`
	TotalCodingQuestion uint      `json:"totalCodingQuestion"`
	IsVideoDone         *bool     `json:"isVideoDone"`
	IsCodingDone        *bool     `json:"isCodingDone"`
	DueDate             time.Time `json:"dueDate"`
} // @name UpdateRoomContextBody
