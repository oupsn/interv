package domains

import (
	"time"

	"gorm.io/gorm"
)

type CodingQuestion struct {
	gorm.Model
	Id          uint                     `gorm:"primaryKey;autoIncrement"`
	Title       string                   `gorm:"type:text"`
	Description string                   `gorm:"type:text"`
	CreatedAt   time.Time                `gorm:"autoCreateTime"`
	CreatedBy   string                   `gorm:"type:text"`
	UpdatedAt   time.Time                `gorm:"autoUpdateTime"`
	UpdatedBy   string                   `gorm:"type:text"`
	Examples    []CodingQuestionExample  `gorm:"foreignKey:CodingQuestionID;references:Id"`
	TestCases   []CodingQuestionTestCase `gorm:"foreignKey:CodingQuestionID;references:Id"`
	Tags        []string                 `gorm:"type:text"`
}

type CodingQuestionExample struct {
	gorm.Model
	CodingQuestionID uint   `gorm:"index"`
	Input            string `gorm:"type:text"`
	Output           string `gorm:"type:text"`
}

type CodingQuestionTestCase struct {
	gorm.Model
	CodingQuestionID uint   `gorm:"index"`
	Input            string `gorm:"type:text"`
	Output           string `gorm:"type:text"`
	IsHidden         bool   `gorm:"default:false"`
}

type CodingQuestionResponse struct {
	Id            uint                     `json:"id"`
	Title         string                   `json:"title"`
	Description   string                   `json:"description"`
	ExampleInput  string                   `json:"example_input"`
	ExampleOutput string                   `json:"example_output"`
	TestCase      []CodingQuestionTestCase `json:"test_case"`
}

type CreateCodingQuestionRequest struct {
	Title       string                   `json:"title"`
	Description string                   `json:"description"`
	Examples    []CodingQuestionExample  `json:"examples"`
	TestCases   []CodingQuestionTestCase `json:"test_cases"`
	Tags        []string                 `json:"tags"`
	Difficulty  string                   `json:"difficulty"`
}

type CreateCodingQuestionResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
