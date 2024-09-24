package repositories

import "csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"

type ICompilationRepository interface {
	GenerateCompileToken(request domains.CompilationRequest) (domains.CompilationTokenResponse, error)
	GetCompileResult(token string) (domains.CompilationResultResponse, error)
}
