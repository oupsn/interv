package cronfunc

import (
	"fmt"
	"strings"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/cvcio/go-plagiarism"
	"github.com/sergi/go-diff/diffmatchpatch"

	"gorm.io/gorm"
)

type RoomWithCode struct {
	Room       domains.Room
	Code       string
	QuestionID uint
}

type RoomListInWorkspace struct {
	WorkspaceId uint
	Room        []RoomWithCode
}

// Helper function to normalize whitespace
func normalizeWhitespace(s string) string {
	// Replace multiple spaces with single space and trim
	fields := strings.Fields(s)
	return strings.Join(fields, " ")
}

func RunPlagiarismCheck(db gorm.DB) error {
	var submissions []domains.CodingQuestionSubmission
	db.Find(&submissions)
	var existingChecks []domains.Plagarism
	db.Find(&existingChecks)

	checkedPairs := make(map[string]bool)
	for _, check := range existingChecks {
		key1 := fmt.Sprintf("%s-%s-%s", check.SourceRoomID, check.TargetRoomID, check.QuestionTitle)
		key2 := fmt.Sprintf("%s-%s-%s", check.TargetRoomID, check.SourceRoomID, check.QuestionTitle)
		checkedPairs[key1] = true
		checkedPairs[key2] = true
	}
	fmt.Println("checkedPairs", checkedPairs)

	workspaceMap := make(map[uint][]RoomWithCode)
	for _, submission := range submissions {
		var room domains.Room
		if err := db.First(&room, "id = ?", submission.RoomID).Error; err != nil {
			continue
		}
		if room.WorkspaceID != 0 {
			workspaceMap[room.WorkspaceID] = append(workspaceMap[room.WorkspaceID],
				RoomWithCode{Room: room, Code: submission.Code, QuestionID: submission.QuestionID})
		}
	}

	detector, err := plagiarism.NewDetector()
	dmp := diffmatchpatch.New()

	if err != nil {
		return err
	}
	var highSimilarity []domains.Plagarism
	for _, rooms := range workspaceMap {
		for i := 0; i < len(rooms); i++ {
			for j := i + 1; j < len(rooms); j++ {
				if rooms[i].QuestionID != rooms[j].QuestionID {
					continue
				}

				var question domains.CodingQuestion
				if err := db.First(&question, "id = ?", rooms[i].QuestionID).Error; err != nil {
					continue
				}

				checkKey := fmt.Sprintf("%s-%s-%s", rooms[i].Room.ID, rooms[j].Room.ID, question.Title)
				if checkedPairs[checkKey] {
					continue
				}

				// Normalize whitespace before comparison
				normalizedCode1 := normalizeWhitespace(rooms[i].Code)
				normalizedCode2 := normalizeWhitespace(rooms[j].Code)

				err := detector.DetectWithStrings(normalizedCode1, normalizedCode2)
				if err != nil {
					continue
				}

				if detector.Score > 0.75 {
					var sourceUser domains.User
					var targetUser domains.User
					var question domains.CodingQuestion
					if err := db.First(&sourceUser, "id = ?", rooms[i].Room.CandidateID).Error; err != nil {
						fmt.Println(err)
						continue
					}
					if err := db.First(&targetUser, "id = ?", rooms[j].Room.CandidateID).Error; err != nil {
						fmt.Println(err)
						continue
					}
					if err := db.First(&question, "id = ?", rooms[i].QuestionID).Error; err != nil {
						fmt.Println(err)
						continue
					}
					diffs := dmp.DiffMain(normalizedCode1, normalizedCode2, false)
					highSimilarity = append(highSimilarity, domains.Plagarism{
						WorkspaceID:    rooms[i].Room.WorkspaceID,
						SourceUser:     sourceUser.ID,
						SourceUserName: sourceUser.Name,
						SourceRoomID:   rooms[i].Room.ID,
						TargetUser:     targetUser.ID,
						TargetUserName: targetUser.Name,
						TargetRoomID:   rooms[j].Room.ID,
						SourceCode:     rooms[i].Code,
						TargetCode:     rooms[j].Code,
						QuestionTitle:  question.Title,
						Score:          detector.Score,
						Diff:           dmp.DiffPrettyText(diffs),
					})
				}
			}
		}
	}
	if err := db.Create(&highSimilarity).Error; err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
