package cronfunc

import (
	"fmt"

	"github.com/cvcio/go-plagiarism"
	"gorm.io/gorm"
)

func RunPlagiarismCheck(db *gorm.DB) error {

	/* detector, _ := plagiarism.NewDetector()
	err := detector.DetectWithStrings(source, target)
	if err != nil {
		return err
	}

	fmt.Printf("Probability: %.2f, Similar n-grams %d, Total n-grams %d\n", detector.Score, detector.Similar, detector.Total)
	return nil */
}
