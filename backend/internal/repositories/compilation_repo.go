package repositories

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type codeCompilationRepository struct {
	BaseURL string
}

func NewCodeCompilationRepository(baseURL string) ICompilationRepository {
	return &codeCompilationRepository{
		BaseURL: baseURL,
	}
}

func (r *codeCompilationRepository) GenerateCompileToken(request domains.CompilationRequest, input string) (domains.CompilationTokenResponse, error) {
	payload, err := json.Marshal(map[string]interface{}{
		"source_code": request.SourceCode,
		"language_id": request.Language,
		"stdin":       input,
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

func (r *codeCompilationRepository) GetCompileResult(token string) (domains.CompilationCompileResult, error) {
	resp, err := http.Get(fmt.Sprintf("%s/submissions/%s", r.BaseURL, token))
	if err != nil {
		return domains.CompilationCompileResult{}, err
	}
	defer resp.Body.Close()
	var result domains.CompilationCompileResult
	err = json.NewDecoder(resp.Body).Decode(&result)
	fmt.Println(result)
	if err != nil {
		return domains.CompilationCompileResult{}, err
	}

	return result, nil
}
