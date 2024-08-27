package domains

type CompilationRequest struct {
	SourceCode string `json:"source_code"`
	Language   string `json:"language"`
}

type CompilationTokenResponse struct {
	Token string `json:"token"`
}

type CompilationResultResponse struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Status struct {
		ID          int    `json:"id"`
		Description string `json:"description"`
	} `json:"status"`
	Time          float64 `json:"time"`
	Memory        int     `json:"memory"`
	Token         string  `json:"token"`
	CompileOutput string  `json:"compile_output"`
	Message       string  `json:"message"`
}
