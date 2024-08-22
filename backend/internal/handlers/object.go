package handlers

type GetObjectBody struct {
	BucketName string `json:"bucketName" validate:"required"`
	ObjectName string `json:"objectName" validate:"required"`
} //@name GetObjectBody
