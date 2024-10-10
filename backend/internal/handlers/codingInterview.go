package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type CodingInterviewGetCompileResultQuery struct {
	Body domains.CompilationRequest `json:"body"  validate:"required"`
} // @name CodingInterviewGetCompileResultQuery

type CodingInterviewAddQuestionQuery struct {
	CodingQuestionID int    `json:"codingQuestionID" validate:"required"`
	Target           string `json:"target" validate:"required"`
	TargetID         int    `json:"targetID" validate:"required"`
} // @name CodingInterviewAddQuestionQuery

// @name CodingInterviewGetCompileResultResponse
type CodingInterviewGetCompileResultResponse []domains.CompilationResultResponse

// @name CodingInterviewGetQuestionsResponse
type CodingInterviewGetQuestionsResponse []domains.CodingQuestionResponse

// @name CodingInterviewGetQuestionByTitleResponse
type CodingInterviewGetQuestionByTitleResponse domains.CodingQuestionResponse

// @name CodingInterviewGetQuestionsInPortalResponse
type CodingInterviewGetQuestionsInPortalResponse []domains.CodingQuestion

// @name CodingInterviewGetQuestionsInWorkspaceResponse
type CodingInterviewGetQuestionsInWorkspaceResponse []domains.CodingQuestion

type CodingInterviewCreateQuestionQuery struct {
	Body domains.CreateCodingQuestionRequest `json:"body"  validate:"required"`
} // @name CodingInterviewCreateQuestionQuery

type CodingInterviewUpdateQuestionQuery struct {
	CodingQuestionID int                                 `json:"codingQuestionID" validate:"required"`
	Body             domains.CreateCodingQuestionRequest `json:"body"  validate:"required"`
} // @name CodingInterviewUpdateQuestionQuery

// @name CodingInterviewCreateQuestionSnapshotQuery
type CodingInterviewCreateQuestionSnapshotQuery []domains.CodingQuestionSnapshot

// @name CodingInterviewCreateQuestionSubmissionQuery
type CodingInterviewCreateQuestionSubmissionQuery []domains.CreateCodingSubmissionRequest

type CodingInterviewGetSubmissionResultByUserQuery struct {
	UserID string `json:"userID" validate:"required"`
} // @name CodingInterviewGetSubmissionResultByUserQuery

// @name CodingInterviewGetSubmissionResultByUserResponse
type CodingInterviewGetSubmissionResultByUserResponse domains.CodingQuestionSubmissionResult
