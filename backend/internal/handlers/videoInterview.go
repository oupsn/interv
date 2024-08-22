package handlers

type VideoInterviewContextQuery struct {
	LobbyID string `json:"lobbyId"  validate:"required"`
} // @name VideoInterviewContextQuery

type VideoInterviewContextResponse struct {
	TotalQuestion   int                             `json:"totalQuestions"  validate:"required"`
	QuestionSetting []VideoInterviewQuestionSetting `json:"questionSetting"  validate:"required"`
} // @name VideoInterviewContextResponse

type VideoInterviewQuestionQuery struct {
	LobbyID       string `json:"lobbyId"  validate:"required"`
	QuestionIndex int    `json:"questionIndex"  validate:"required"`
} // @name VideoInterviewQuestionQuery

type VideoInterviewQuestionResponse struct {
	QuestionIndex int    `json:"questionIndex"  validate:"required"`
	Topic         string `json:"question"  validate:"required"`
} // @name VideoInterviewQuestionResponse

type VideoInterviewQuestionSetting struct {
	QuestionIndex int  `json:"questionIndex"  validate:"required"`
	Retry         int  `json:"retry"  validate:"required"`
	TimeToPrepare int  `json:"timeToPrepare"  validate:"required"`
	TimeToAnswer  int  `json:"timeToAnswer"  validate:"required"`
	IsLast        bool `json:"isLast"  validate:"required"`
} // @name VideoInterviewQuestionSetting
