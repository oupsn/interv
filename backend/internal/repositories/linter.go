package repositories

type ILinterRepository interface {
	Analyze(request AnalyzeRequest) (AnalyzeResponse, error)
}

type AnalyzeRequest struct {
	Language string `json:"language"`
	Code     string `json:"code"`
}

type AnalyzeResponse struct {
	Message string          `json:"message"`
	Results []AnalyzeResult `json:"results"`
}

type AnalyzeResult struct {
	Line        int    `json:"line"`
	Description string `json:"description"`
}
