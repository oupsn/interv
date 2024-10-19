package handlers

import (
	"time"
)

type WorkspaceDetail struct {
	Id            uint                  `json:"id"`
	Title         string                `json:"title"`
	StartDate     time.Time             `json:"startDate"`
	EndDate       time.Time             `json:"endDate"`
	IsVideo       bool                  `json:"isVideo"`
	IsCoding      bool                  `json:"isCoding"`
	VideoTime     uint                  `json:"videoTime"`
	CodingTime    uint                  `json:"codingTime"`
	ReqScreen     bool                  `json:"reqScreen"`
	ReqMicrophone bool                  `json:"reqMicrophone"`
	ReqCamera     bool                  `json:"reqCamera"`
	PortalId      uint                  `json:"portalId"`
	MemberNum     uint                  `json:"memberNum"`
	CreateAt      time.Time             `json:"createAt"`
	VideoQueston  []VideoQuestionDetail `json:"videoQueston"`
} // @name WorkspaceDetail

type CreateWorkspaceBody struct {
	Title         string `json:"title" validate:"required"`
	StartDate     string `json:"startDate" validate:"required"`
	EndDate       string `json:"endDate" validate:"required"`
	IsVideo       *bool  `json:"isVideo" validate:"required"`
	IsCoding      *bool  `json:"isCoding" validate:"required"`
	VideoTime     uint   `json:"videoTime"`
	CodingTime    uint   `json:"codingTime"`
	ReqScreen     *bool  `json:"reqScreen" validate:"required"`
	ReqMicrophone *bool  `json:"reqMicrophone" validate:"required"`
	ReqCamera     *bool  `json:"reqCamera" validate:"required"`
	PortalId      uint   `json:"portalId" validate:"required"`
	CodeQuestion  []uint `json:"codeQuestion" validate:"required"`
	VideoQuestion []uint `json:"videoQuestion" validate:"required"`
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

type InviteAllCandidateBody struct {
	WorkspaceId uint `json:"workspaceId" validate:"required"`
}
type VideoQuestionDetail struct {
	ID            uint   `json:"id" validate:"required"`
	PortalID      uint   `json:"portalId" validate:"required"`
	Title         string `json:"title" validate:"required"`
	TimeToPrepare uint   `json:"timeToPrepare" validate:"required"`
	TimeToAnswer  uint   `json:"timeToAnswer" validate:"required"`
	TotalAttempt  uint   `json:"totalAttempt" validate:"required"`
} // @name VideoQuestionDetail

type InterestUser struct {
	WorkspaceId uint `json:"workspaceId" validate:"required"`
	UserId      uint `json:"userId" validate:"required"`
	IsInterest  bool `json:"isInterest" validate:"required"`
} // @name InterestUser

type GetIndividualUserBody struct {
	WorkspaceId uint `json:"workspaceId" validate:"required"`
	UserId      uint `json:"userId" validate:"required"`
} // @name GetIndividualUserBody
