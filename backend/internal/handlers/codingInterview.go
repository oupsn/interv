package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type CodingInterviewGenerateCompileTokenQuery struct {
	Body domains.CompilationRequest `json:"body"  validate:"required"`
} // @name CodingInterviewGenerateCompileTokenQuery

type CodingInterviewGenerateCompileTokenResponse struct {
	Token string `json:"token"`
} // @name CodingInterviewGenerateCompileTokenResponse

type CodingInterviewGetCompileResultResponse struct {
	CompileResult domains.CompilationResultResponse `json:"compileResult"`
} // @name CodingInterviewGetCompileResultResponse

// @name CodingInterviewGetQuestionsResponse
type CodingInterviewGetQuestionsResponse []domains.CodingQuestionResponse

type CodingInterviewCreateQuestionQuery struct {
	Body domains.CreateCodingQuestionRequest `json:"body"  validate:"required"`
} // @name CodingInterviewCreateQuestionQuery
