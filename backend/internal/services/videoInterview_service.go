package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
	"mime/multipart"
	"strings"
)

type videoInterviewService struct {
	objectRepository repositories.IObjectRepository
}

func NewVideoInterviewService(objectRepository repositories.IObjectRepository) IVideoInterviewService {
	return &videoInterviewService{
		objectRepository: objectRepository,
	}
}

func (v videoInterviewService) SubmitVideoInterview(file *multipart.FileHeader) error {
	filename := "LOBBYID-UID-QUESTIONINDEX-QUESTIONID" + file.Filename //TODO: Implement this
	filename = strings.ReplaceAll(filename, " ", "")
	if err := v.objectRepository.Upload(file, "video-interview", filename); err != nil {
		return ErrorUploadingVideo
	}
	return nil
}
