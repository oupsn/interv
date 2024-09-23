package services

import (
	"mime/multipart"

	"github.com/gofiber/fiber/v2"
)

var (
	ErrorUploadObject = fiber.NewError(fiber.StatusInternalServerError, "error uploading object")
	ErrorGetObject    = fiber.NewError(fiber.StatusInternalServerError, "error getting object")
)

type IObjectService interface {
	UploadObject(file *multipart.FileHeader, bucketName string) error
	GetObject(bucketName string, objectName string) (string, error)
}
