package cronfunc

import (
	"fmt"
	"math"
	"strings"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"github.com/adrg/strutil"
	"github.com/adrg/strutil/metrics"
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

func normalizeWhitespace(s string) string {
	fields := strings.Fields(s)
	return strings.Join(fields, " ")
}

func checkPlagarism(sourceCode, targetCode string) (float64, error) {
	similarity := strutil.Similarity(sourceCode, targetCode, metrics.NewJaroWinkler())
	return similarity, nil
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

	dmp := diffmatchpatch.New()
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
				fmt.Println("normalizecode1", normalizedCode1)
				normalizedCode2 := normalizeWhitespace(rooms[j].Code)
				fmt.Println("normalizecode2", normalizedCode2)

				plagarismScore, err := checkPlagarism(normalizedCode1, normalizedCode2)
				if err != nil {
					continue
				}
				fmt.Println("score", plagarismScore)
				if plagarismScore > 0.7 {
					score := plagarismScore
					if math.IsInf(score, 0) || math.IsNaN(score) {
						score = 1.0
					}

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
					if score > 1 {
						score = 1
					}
					diffs := dmp.DiffMain(normalizedCode1, normalizedCode2, true)
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
						Score:          score,
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
