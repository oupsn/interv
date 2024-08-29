package domains

import (
	"time"

	"gorm.io/gorm"
)

type CodingQuestion struct {
	Id          uint                     `gorm:"primaryKey;autoIncrement"`
	Title       string                   `gorm:"type:text"`
	Description string                   `gorm:"type:text"`
	CreatedAt   time.Time                `gorm:"autoCreateTime"`
	CreatedBy   string                   `gorm:"type:text"`
	UpdatedAt   time.Time                `gorm:"autoUpdateTime"`
	UpdatedBy   string                   `gorm:"type:text"`
	Examples    []CodingQuestionExample  `gorm:"foreignKey:QuestionID"`
	TestCases   []CodingQuestionTestCase `gorm:"foreignKey:QuestionID"`
	Tags        []string                 `gorm:"type:text"`
	Difficulty  string                   `gorm:"type:text"`
	gorm.Model
}

type CodingQuestionExample struct {
	Id         uint `gorm:"primaryKey;autoIncrement"`
	QuestionID uint
	Question   CodingQuestion `gorm:"foreignKey:Id"`
	Input      string         `gorm:"type:text"`
	Output     string         `gorm:"type:text"`
	CreatedAt  time.Time      `gorm:"autoCreateTime"`
	UpdatedAt  time.Time      `gorm:"autoUpdateTime"`
	gorm.Model
}

type CodingQuestionTestCase struct {
	Id             uint `gorm:"primaryKey;autoIncrement"`
	QuestionID     uint
	Question       CodingQuestion `gorm:"foreignKey:Id;references:Id"`
	Input          string         `gorm:"type:text"`
	ExpectedOutput string         `gorm:"type:text"`
	IsHidden       bool           `gorm:"default:false"`
	CreatedAt      time.Time      `gorm:"autoCreateTime"`
	UpdatedAt      time.Time      `gorm:"autoUpdateTime"`
	gorm.Model
}

type CodingQuestionResponse struct {
	Id            uint                     `json:"id"`
	Title         string                   `json:"title"`
	Description   string                   `json:"description"`
	ExampleInput  string                   `json:"example_input"`
	ExampleOutput string                   `json:"example_output"`
	TestCase      []CodingQuestionTestCase `json:"test_case"`
}
