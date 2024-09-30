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
	CodingQuestionID uint           `gorm:"index"`
	LobbyID          uint           `gorm:"index"`
	Code             string         `gorm:"type:text"`
	Language         string         `gorm:"type:text"`
	MemoryUsage      string         `gorm:"type:text"`
	RunTime          string         `gorm:"type:text"`
	LinterResult     string         `gorm:"type:text"`
	TestCasesResult  uint           `gorm:"type:integer"`
	CodingQuestion   CodingQuestion `gorm:"foreignKey:CodingQuestionID"`
	Lobby            Lobby          `gorm:"foreignKey:LobbyID"`
}

type CodingQuestionTestCaseResponse struct {
	Input  string `json:"input"`
	Output string `json:"output"`
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

type CreateCodingQuestionResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
