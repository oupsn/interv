package repositories

import (
	"bytes"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"encoding/json"
	"fmt"
	"net/http"
)

type codeCompilationRepository struct {
	BaseURL string
}

func NewCodeCompilationRepository(baseURL string) ICompilationRepository {
	return &codeCompilationRepository{
		BaseURL: baseURL,
	}
}

func (r *codeCompilationRepository) GenerateCompileToken(request domains.CompilationRequest) (domains.CompilationTokenResponse, error) {
	payload, err := json.Marshal(map[string]interface{}{
		"source_code": request.SourceCode,
		"language_id": request.Language,
		"stdin":       request.Input,
	})
	if err != nil {
		return domains.CompilationTokenResponse{}, err
	}

	resp, err := http.Post(fmt.Sprintf("%s/submissions/?base64_encoded=false&wait=false", r.BaseURL), "application/json", bytes.NewBuffer(payload))
	if err != nil {
		return domains.CompilationTokenResponse{}, err
	}
	defer resp.Body.Close()

	var result domains.CompilationTokenResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return domains.CompilationTokenResponse{}, err
	}

	return result, nil
}

func (r *codeCompilationRepository) GetCompileResult(token string) (domains.CompilationResultResponse, error) {
	resp, err := http.Get(fmt.Sprintf("%s/submissions/%s", r.BaseURL, token))
	if err != nil {
		return domains.CompilationResultResponse{}, err
	}
	defer resp.Body.Close()
	var result domains.CompilationResultResponse
	err = json.NewDecoder(resp.Body).Decode(&result)

	if err != nil {
		return domains.CompilationResultResponse{}, err
	}

	return result, nil
}
