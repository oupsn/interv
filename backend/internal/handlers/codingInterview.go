package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type CodingInterviewGetCompileResultQuery struct {
	Body domains.CompilationRequest `json:"body"  validate:"required"`
} // @name CodingInterviewGetCompileResultQuery

// @name CodingInterviewGetCompileResultResponse
type CodingInterviewGetCompileResultResponse []domains.CompilationResultResponse

// @name CodingInterviewGetQuestionsResponse
type CodingInterviewGetQuestionsResponse []domains.CodingQuestionResponse

type CodingInterviewCreateQuestionQuery struct {
	Body domains.CreateCodingQuestionRequest `json:"body"  validate:"required"`
} // @name CodingInterviewCreateQuestionQuery
