package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type ObjectHandler struct {
	objectService services.IObjectService
}

func NewObjectHandler(objectService services.IObjectService) ObjectHandler {
	return ObjectHandler{
		objectService: objectService,
	}
}

// UploadObject
// @ID uploadObject
// @Tags object
// @Summary Upload object to the system
// @Accept multipart/form-data
// @Produce json
// @Param file formData file true "Video Interview File"
// @Param bucketName formData string true "Bucket Name"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /object.uploadObject [post]
func (o ObjectHandler) UploadObject(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	bucketName := c.FormValue("bucketName")
	if err != nil {
		return err
	}

	err = o.objectService.UploadObject(file, bucketName)
	if err != nil {
		return err
	}

	return Ok(c, "Object uploaded successfully")
}

// GetObject
// @ID getObject
// @Tags object
// @Summary Get object from the system
// @Produce json
// @Param payload body GetObjectBody true "Get Object Body"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /object.getObject [post]
func (o ObjectHandler) GetObject(c *fiber.Ctx) error {
	body := GetObjectBody{}
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	preSignUrl, err := o.objectService.GetObject(body.BucketName, body.ObjectName)
	if err != nil {
		return err
	}

	return c.Redirect(preSignUrl)
}
