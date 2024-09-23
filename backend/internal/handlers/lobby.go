package handlers

import "time"

type GetLobbyContextQuery struct {
	LobbyID uint `json:"lobbyId"  validate:"required"`
} // @name GetLobbyContextQuery

type GetLobbyContextResponse struct {
	LobbyID             uint      `json:"lobbyId"  validate:"required"`
	UserID              uint      `json:"userId"  validate:"required"`
	TotalVideoTime      uint      `json:"totalVideoTime"  validate:"required"`
	TotalCodingTime     uint      `json:"totalCodingTime"  validate:"required"`
	TotalVideoQuestion  uint      `json:"totalVideoQuestion"  validate:"required"`
	TotalCodingQuestion uint      `json:"totalCodingQuestion"  validate:"required"`
	IsVideoDone         bool      `json:"isVideoDone"  validate:"required"`
	IsCodingDone        bool      `json:"isCodingDone"  validate:"required"`
	DueDate             time.Time `json:"dueDate"  validate:"required"`
} // @name GetLobbyContextResponse

type UpdateLobbyContextBody struct {
	LobbyID             uint      `json:"lobbyId"  validate:"required"`
	UserID              uint      `json:"userId"`
	TotalVideoTime      uint      `json:"totalVideoTime"`
	TotalCodingTime     uint      `json:"totalCodingTime"`
	TotalVideoQuestion  uint      `json:"totalVideoQuestion"`
	TotalCodingQuestion uint      `json:"totalCodingQuestion"`
	IsVideoDone         bool      `json:"isVideoDone"`
	IsCodingDone        bool      `json:"isCodingDone"`
	DueDate             time.Time `json:"dueDate"`
} // @name UpdateLobbyContextBody
