package services

import (
	"github.com/gofiber/fiber/v2"
	"mime/multipart"
)

var (
	ErrorUploadObject = fiber.NewError(fiber.StatusInternalServerError, "error uploading object")
	ErrorGetObject    = fiber.NewError(fiber.StatusInternalServerError, "error getting object")
)

type IObjectService interface {
	UploadObject(file *multipart.FileHeader, bucketName string) error
	GetObject(bucketName string, objectName string) (string, error)
}
