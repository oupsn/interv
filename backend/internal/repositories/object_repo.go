package repositories

import (
	"context"
	"mime/multipart"
	"net/url"
	"time"

	"github.com/minio/minio-go/v7"
)

type objectRepository struct {
	MINIO minio.Client
}

func NewObjectRepository(minio minio.Client) IObjectRepository {
	return &objectRepository{
		MINIO: minio,
	}
}

func (o objectRepository) Upload(file *multipart.FileHeader, bucketName string, objectName string) error {
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	contentType := file.Header.Get("Content-Type")

	exists, err := o.MINIO.BucketExists(context.Background(), bucketName)
	if err != nil {
		return err
	}
	if !exists {
		err = o.MINIO.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{})
		if err != nil {
			return err
		}
	}

	_, err = o.MINIO.PutObject(context.Background(), bucketName, objectName, src, file.Size, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		return err
	}

	return nil
}

func (o objectRepository) Get(bucketName string, objectName string) (string, error) {
	reqParams := make(url.Values)
	preSignUrl, err := o.MINIO.PresignedGetObject(context.Background(), bucketName, objectName, time.Minute*10, reqParams)
	if err != nil {
		return "", err
	}

	return preSignUrl.String(), nil
}

func (o objectRepository) Delete() (err error) {
	//TODO implement me
	panic("implement me")
}
