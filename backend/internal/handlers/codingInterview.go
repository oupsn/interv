package handlers

import "csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"

type CodingInterviewCompileQuery struct {
	Body domains.CompilationRequest `json:"body"  validate:"required"`
} // @name CodingInterviewCompileResoponses

type CodingInterviewCompileResponse struct {
	CompileResult domains.CompilationResultResponse `json:"compileResult"`
} // @name CodingInterviewCompileResoponses
