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
	CompanyName         string    `json:"companyName"  validate:"required"`
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
} // @name GetRoomSessionQuery

type SetRoomSessionBody struct {
	RoomID            string `json:"roomId"  validate:"required"`
	SessionIdentifier string `json:"sessionIdentifier"  validate:"required"`
} // @name SetRoomSessionBody

type GetRoomHistoryQuery struct {
	RoomID     string `json:"roomId"  validate:"required"`
	QuestionID uint   `json:"questionId"  validate:"required"`
} // @name GetRoomHistoryQuery

type GetRoomHistoryResponse struct {
	ShouldSkipQuestion  bool `json:"shouldSkipQuestion"  validate:"required"`
	MaxAttempt          uint `json:"maxAttempt"  validate:"required"`
	CurrentAttempt      uint `json:"currentAttempt"  validate:"required"`
	IsTimeToAnswerLeft  bool `json:"isTimeToAnswerLeft"  validate:"required"`
	IsTimeToPrepareLeft bool `json:"isTimeToPrepareLeft"  validate:"required"`
	TimeToAnswerLeft    int  `json:"timeToAnswerLeft"  validate:"required"`
	TimeToPrepareLeft   int  `json:"timeToPrepareLeft"  validate:"required"`
} // @name GetRoomHistoryResponse

type UpdateStartAnswerTimeBody struct {
	RoomID     string `json:"roomId"  validate:"required"`
	QuestionID uint   `json:"questionId"  validate:"required"`
} // @name UpdateStartAnswerTimeBody

type AddRoomHistoryBody struct {
	RoomID     string `json:"roomId"  validate:"required"`
	QuestionID uint   `json:"questionId"  validate:"required"`
}
