package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	userSvc services.UserService
}

func NewUserHandler(userSvc services.UserService) UserHandler {
	return UserHandler{
		userSvc: userSvc,
	}
}

// CreateUser
// @ID createUser
// @Tags user
// @Summary Create new user
// @Accept json
// @Produce json
// @Param payload body CreateUserBody true "CreateUserBody"
// @Success 200 {object} Response[UserData]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /user.createUser [post]
func (u UserHandler) CreateUser(c *fiber.Ctx) error {
	form := new(CreateUserBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	if err := validate.Struct(form); err != nil {
		return err
	}

	response, err := u.userSvc.Create(*form.Username, *form.Password, *form.Role, *form.Department)

	if err != nil {
		return err
	}

	return Created(c, UserData{
		ID:         response.ID,
		Username:   response.Username,
		Department: response.Department,
		Role:       response.Role,
		CreatedAt:  response.CreatedAt,
		UpdatedAt:  response.UpdatedAt,
	})
}

// DeleteUser
// @ID deleteUser
// @Tags user
// @Summary Delete user
// @Accept json
// @Produce json
// @Param payload body DeleteUserBody true "DeleteUserBody"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /user.deleteUser [post]
func (u UserHandler) DeleteUser(c *fiber.Ctx) error {
	form := new(DeleteUserBody)

	if err := c.BodyParser(form); err != nil {
		return err
	}

	userId, err := GetCurrentUser(c)

	if err != nil {
		return err
	}

	if *form.ID == *userId {
		return fiber.NewError(fiber.StatusBadRequest, "cannot delete yourself")
	}

	if err := u.userSvc.Delete(*form.ID); err != nil {
		return err
	}

	return Ok(c, form.ID)
}
