package handlers

import "time"

type CreateRoomBody struct {
	CandidateID uint `json:"candidateId"  validate:"required"`
	WorkspaceID uint `json:"workspaceId"  validate:"required"`
} // @name CreateRoomBody

type CreateRoomResponse struct {
	RoomID      string `json:"roomId"  validate:"required"`
	CandidateID uint   `json:"candidateId"  validate:"required"`
} // @name CreateRoomResponse

type GetRoomContextQuery struct {
	RoomID string `json:"roomId"  validate:"required"`
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
	RoomID       string `json:"roomId"  validate:"required"`
	CandidateID  uint   `json:"candidateId"`
	IsVideoDone  *bool  `json:"isVideoDone"`
	IsCodingDone *bool  `json:"isCodingDone"`
} // @name UpdateRoomContextBody

type RevokeRoomSessionBody struct {
	RoomID string `json:"roomId"  validate:"required"`
} // @name RevokeRoomSessionBody

type ExtendRoomSessionBody struct {
	RoomID            string `json:"roomId"  validate:"required"`
	SessionIdentifier string `json:"sessionIdentifier"  validate:"required"`
} // @name ExtendRoomSessionBody

type PendingInterviewBody struct {
	RoomID string `json:"roomId"  validate:"required"`
} // @name ExtendRoomSessionBody

type GetRoomSessionQuery struct {
	RoomID string `json:"roomId"  validate:"required"`
}

type SetRoomSessionBody struct {
	RoomID            string `json:"roomId"  validate:"required"`
	SessionIdentifier string `json:"sessionIdentifier"  validate:"required"`
}
