package domains

import (
	"time"

	"gorm.io/gorm"
)

type CodingQuestion struct {
	gorm.Model
	Id                     uint                     `gorm:"primaryKey;autoIncrement" json:"id"`
	Title                  string                   `gorm:"type:text" json:"title"`
	Description            string                   `gorm:"type:text" json:"description"`
	InputDescription       string                   `gorm:"type:text" json:"input_description"`
	OutputDescription      string                   `gorm:"type:text" json:"output_description"`
	CreatedAt              time.Time                `gorm:"autoCreateTime" json:"created_at"`
	CreatedBy              string                   `gorm:"type:text" json:"created_by"`
	UpdatedAt              time.Time                `gorm:"autoUpdateTime" json:"updated_at"`
	UpdatedBy              string                   `gorm:"type:text" json:"updated_by"`
	TestCases              []CodingQuestionTestCase `gorm:"foreignKey:CodingQuestionID;references:Id" json:"test_cases"`
	Difficulty             string                   `gorm:"type:text" json:"difficulty"`
	CodingQuestionInPortal []CodingQuestionInPortal `gorm:"foreignKey:CodingQuestionID;references:Id" json:"coding_question_in_portal"`
}

type CodingQuestionInPortal struct {
	gorm.Model
	CodingQuestionID uint           `gorm:"index"`
	PortalID         uint           `gorm:"index"`
	CodingQuestion   CodingQuestion `gorm:"foreignKey:CodingQuestionID"`
	Portal           Portal         `gorm:"foreignKey:PortalID"`
}

type CodingQuestionInWorkspace struct {
	gorm.Model
	CodingQuestionID uint           `gorm:"index"`
	WorkspaceID      uint           `gorm:"index"`
	CodingQuestion   CodingQuestion `gorm:"foreignKey:CodingQuestionID"`
	Workspace        Workspace      `gorm:"foreignKey:WorkspaceID"`
}

type CodingQuestionTestCase struct {
	gorm.Model
	CodingQuestionID uint   `gorm:"index"`
	Input            string `gorm:"type:text"`
	Output           string `gorm:"type:text"`
	IsHidden         bool   `gorm:"default:false"`
	IsExample        bool   `gorm:"default:false"`
}

type CodingQuestionSnapshot struct {
	gorm.Model
	CodingQuestionID uint   `gorm:"index" json:"coding_question_id"`
	RoomID           string `gorm:"index" json:"room_id"`
	Code             string `gorm:"type:text" json:"code"`
	Language         string `gorm:"type:text" json:"language"`
	MemoryUsage      string `gorm:"type:text" json:"memory_usage"`
	RunTime          string `gorm:"type:text" json:"run_time"`
	TimeTaken        int64  `gorm:"type:bigint" json:"time_taken"`
	LinterResult     string `gorm:"type:text" json:"linter_result"`
	TestCasesResult  uint   `gorm:"type:integer" json:"test_cases_result"`
	IsSubmitted      *bool  `gorm:"default:false" json:"is_submitted"`
}

type CodingQuestionTestCaseResponse struct {
	Input     string `json:"input"`
	Output    string `json:"output"`
	IsExample bool   `json:"is_example"`
	IsHidden  bool   `json:"is_hidden"`
}

type CodingQuestionResponse struct {
	Id                uint                             `json:"id"`
	Title             string                           `json:"title"`
	Description       string                           `json:"description"`
	InputDescription  string                           `json:"input_description"`
	OutputDescription string                           `json:"output_description"`
	TestCase          []CodingQuestionTestCaseResponse `json:"test_case"`
	Difficulty        string                           `json:"difficulty"`
}

type CreateCodingQuestionRequest struct {
	Title             string                   `json:"title"`
	Description       string                   `json:"description"`
	InputDescription  string                   `json:"input_description"`
	OutputDescription string                   `json:"output_description"`
	TestCases         []CodingQuestionTestCase `json:"test_cases"`
	Difficulty        string                   `json:"difficulty"`
}
type CodingSnapshotQuestion struct {
	QuestionID uint   `json:"question_id"`
	Code       string `json:"code"`
	Language   string `json:"language"`
}

type CreateCodingSnapshotRequest struct {
	LobbyID   uint                     `json:"room_id"`
	Questions []CodingSnapshotQuestion `json:"questions"`
	TimeTaken int64                    `json:"time_taken"`
}

type CreateCodingQuestionResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
