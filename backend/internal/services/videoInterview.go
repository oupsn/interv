package services

import (
	"github.com/gofiber/fiber/v2"
	"mime/multipart"
)

var (
	ErrorUploadingVideo = fiber.NewError(fiber.StatusInternalServerError, "error uploading video")
)

type IVideoInterviewService interface {
	SubmitVideoInterview(file *multipart.FileHeader) error
}
