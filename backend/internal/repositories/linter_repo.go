package repositories

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type linterRepository struct {
	pythonLinterEndpoint string
	javaLinterEndpoint   string
	cLinterEndpoint      string
}

func NewLinterRepository(pythonLinterEndpoint, javaLinterEndpoint, cLinterEndpoint string) ILinterRepository {
	return &linterRepository{
		pythonLinterEndpoint: pythonLinterEndpoint,
		javaLinterEndpoint:   javaLinterEndpoint,
		cLinterEndpoint:      cLinterEndpoint,
	}
}

func (l *linterRepository) Analyze(request AnalyzeRequest) (AnalyzeResponse, error) {
	payload, err := json.Marshal(map[string]interface{}{
		"code": request.Code,
	})
	if err != nil {
		return AnalyzeResponse{}, err
	}
	if request.Language == "python" {
		response, err := http.Post(l.pythonLinterEndpoint, "application/json", bytes.NewBuffer(payload))
		if err != nil {
			return AnalyzeResponse{}, err
		}
		defer response.Body.Close()
		var result AnalyzeResponse
		err = json.NewDecoder(response.Body).Decode(&result)
		if err != nil {
			return AnalyzeResponse{}, err
		}
		return result, nil
	} else if request.Language == "java" {
		response, err := http.Post(l.javaLinterEndpoint, "application/json", bytes.NewBuffer(payload))
		if err != nil {
			return AnalyzeResponse{}, err
		}
		defer response.Body.Close()
		var result AnalyzeResponse
		err = json.NewDecoder(response.Body).Decode(&result)
		if err != nil {
			return AnalyzeResponse{}, err
		}
		return result, nil
	} else if request.Language == "c" {
		response, err := http.Post(l.cLinterEndpoint, "application/json", bytes.NewBuffer(payload))
		if err != nil {
			return AnalyzeResponse{}, err
		}
		defer response.Body.Close()
		var result AnalyzeResponse
		err = json.NewDecoder(response.Body).Decode(&result)
		if err != nil {
			return AnalyzeResponse{}, err
		}
		return result, nil
	}
	return AnalyzeResponse{}, nil
}
