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

type CodingInterviewCreateQuestionQuery struct {
	Body domains.CreateCodingQuestionRequest `json:"body"  validate:"required"`
} // @name CodingInterviewCreateQuestionQuery
