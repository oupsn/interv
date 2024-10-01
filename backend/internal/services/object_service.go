package services

import (
	"mime/multipart"
	"strings"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type objectService struct {
	objectRepository repositories.IObjectRepository
}

func NewObjectService(objectRepository repositories.IObjectRepository) IObjectService {
	return &objectService{
		objectRepository: objectRepository,
	}
}

func (o objectService) UploadObject(file *multipart.FileHeader, bucketName string) error {
	objectName := "UID-RoomID-QUESTIONID-SOMETHING-" + file.Filename //TODO: Implement this
	objectName = strings.ReplaceAll(objectName, " ", "")
	err := o.objectRepository.Upload(file, bucketName, objectName)
	if err != nil {
		return ErrorUploadObject
	}
	return nil
}

func (o objectService) GetObject(bucketName string, objectName string) (string, error) {
	preSignUrl, err := o.objectRepository.Get(bucketName, objectName)
	if err != nil {
		return "", ErrorGetObject
	}
	return preSignUrl, nil
}
