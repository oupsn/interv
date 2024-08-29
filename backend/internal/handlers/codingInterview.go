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

type CodingInterviewGetQuestionsResponse struct {
	Questions []domains.CodingQuestionResponse `json:"questions"`
} // @name CodingInterviewGetQuestionsResponse
