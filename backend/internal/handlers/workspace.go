package handlers

import (
	"time"
)

type WorkspaceDetail struct {
	Id        uint      `json:"id"`
	Title     string    `json:"title"`
	IsVideo   bool      `json:"isVideo"`
	IsCoding  bool      `json:"isCoding"`
	StartDate time.Time `json:"startDate"`
	StopDate  time.Time `json:"stopDate"`
	Owner     uint      `json:"owner"`
	MemberNum uint      `json:"memberNum"`
} // @name WorkspaceDetail

type CreateWorkspaceBody struct {
	Title     string    `json:"title" validate:"required"`
	IsVideo   *bool     `json:"isVideo" validate:"required"`
	IsCoding  *bool     `json:"isCoding" validate:"required"`
	StartDate time.Time `json:"startDate" validate:"required"`
	StopDate  time.Time `json:"stopDate" validate:"required"`
} // @name CreateWorkspaceBody

type GetWorkspaceBody struct {
	Id uint `json:"id" validate:"required"`
} // @name GetWorkspaceBody

type DeleteWorkspaceBody struct {
	Id uint `json:"id" validate:"required"`
} // @name DeleteWorkspaceBody

type UserInWorkspace struct {
	Id          uint   `json:"id" validate:"required"`
	UserId      uint   `json:"userId" validate:"required"`
	WorkspaceId uint   `json:"workspaceId" validate:"required"`
	Status      string `json:"status" validate:"required"`
	IsInterest  bool   `json:"isInterest" validate:"required"`
} // @name UserInWorkspace

type AddUserToWorkspaceBody struct {
	UserId      uint   `json:"userId" validate:"required"`
	WorkspaceId uint   `json:"workspaceId" validate:"required"`
	Status      string `json:"status" validate:"required"`
} // @name AddUserToWorkspaceBody

type DeleteUserFromWorkspaceBody struct {
	UserId      uint `json:"userId" validate:"required"`
	WorkspaceId uint `json:"workspaceId" validate:"required"`
} // @name DeleteUserFromWorkspaceBody

type WorkspaceData struct {
	WorkspaceDetail WorkspaceDetail  `json:"workspaceDetail" validate:"required"`
	IndividualUser  []IndividualUser `json:"individualUser" validate:"required"`
} // @name WorkspaceData

type IndividualUser struct {
	Id              int             `json:"id" validate:"required"`
	UserInWorkspace UserInWorkspace `json:"userInWorkspace" validate:"required"`
	UserData        UserData        `json:"userData" validate:"required"`
} // @name IndividualUser
