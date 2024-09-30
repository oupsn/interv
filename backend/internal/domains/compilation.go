package domains

type CompilationRequest struct {
	SourceCode string `json:"source_code"`
	Language   uint   `json:"language"`
	QuestionID uint   `json:"question_id"`
}

type CompilationTokenResponse struct {
	Token string `json:"token"`
}
type CompilationCompileResult struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Status struct {
		ID          int    `json:"id"`
		Description string `json:"description"`
	} `json:"status"`
	Time          string `json:"time"`
	Memory        int    `json:"memory"`
	CompileOutput string `json:"compile_output"`
	Message       string `json:"message"`
}
type CompilationResultResponse struct {
	TestcaseId    int                      `json:"test_case_id"`
	IsPassed      bool                     `json:"is_passed"`
	CompileResult CompilationCompileResult `json:"compile_result"`
}
