package handlers

type VideoInterviewContextQuery struct {
	RoomID uint `json:"roomId"  validate:"required"`
} // @name VideoInterviewContextQuery

type VideoInterviewContextResponse struct {
	TotalQuestion   int                             `json:"totalQuestions"  validate:"required"`
	QuestionSetting []VideoInterviewQuestionSetting `json:"questionSetting"  validate:"required"`
} // @name VideoInterviewContextResponse

type VideoInterviewQuestionQuery struct {
	QuestionID uint `json:"questionId"  validate:"required"`
} // @name VideoInterviewQuestionQuery

type VideoInterviewQuestionResponse struct {
	QuestionId uint   `json:"questionId"  validate:"required"`
	Topic      string `json:"question"  validate:"required"`
} // @name VideoInterviewQuestionResponse

type VideoInterviewQuestionSetting struct {
	QuestionID    uint `json:"questionId"  validate:"required"`
	QuestionIndex int  `json:"questionIndex"  validate:"required"`
	TotalAttempt  uint `json:"totalAttempt"  validate:"required"`
	TimeToPrepare uint `json:"timeToPrepare"  validate:"required"`
	TimeToAnswer  uint `json:"timeToAnswer"  validate:"required"`
	IsLast        bool `json:"isLast"  validate:"required"`
} // @name VideoInterviewQuestionSetting
