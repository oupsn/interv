package repositories

import "csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"

type ICompilationRepository interface {
	GenerateCompileToken(request domains.CompilationRequest, input string) (domains.CompilationTokenResponse, error)
	GetCompileResult(token string) (domains.CompilationCompileResult, error)
}
