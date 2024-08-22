package repositories

import (
	"mime/multipart"
)

type IObjectRepository interface {
	Upload(file *multipart.FileHeader, bucketName string, objectName string) error
	Get(bucketName string, objectName string) (presignedURL string, err error)
	Delete() (err error)
}
