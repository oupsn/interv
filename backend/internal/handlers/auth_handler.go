package handlers

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/services"
	"github.com/gofiber/fiber/v2"
	"strconv"
	"time"
)

type AuthenticationHandler struct {
	authService services.IAuthService
}

func NewAuthHandler(authService services.IAuthService) AuthenticationHandler {
	return AuthenticationHandler{
		authService: authService,
	}
}

// Login
// @ID login
// @Tags authentication
// @Summary Login to the system
// @Accept json
// @Produce json
// @Param payload body LoginBody true "LoginBody"
// @Success 200 {object} Response[string]
// @Failure 400 {object} ErrResponse
// @Failure 500 {object} ErrResponse
// @Router /auth.login [post]
func (a AuthenticationHandler) Login(c *fiber.Ctx) error {

	// Retrieve form
	body := LoginBody{}

	// Parse and store form into a struct
	if err := c.BodyParser(&body); err != nil {
		return err
	}

	// Validate form
	if err := validate.Struct(body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	userId, token, err := a.authService.Login(body.Username, body.Password)
	if err != nil {
		return err
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    *token,
		Expires:  time.Now().Add(time.Hour * 72),
		HTTPOnly: true,
		Secure:   true,
	})
	c.Cookie(&fiber.Cookie{
		Name:     "userId",
		Value:    strconv.Itoa(int(*userId)),
		Expires:  time.Now().Add(time.Hour * 72),
		HTTPOnly: true,
		Secure:   true,
	})

	return Ok(c, token)
}

// Logout
// @ID logout
// @Tags authentication
// @Summary Logout from the system
// @Accept json
// @Produce json
// @Success 200 {object} OkResponse
// @Router /auth.logout [post]
func (a AuthenticationHandler) Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:   "token",
		Value:  "",
		MaxAge: 1,
	})
	c.Cookie(&fiber.Cookie{
		Name:   "userId",
		Value:  "",
		MaxAge: 1,
	})

	return Ok(c, "Logged out")
}

// Me
// @ID me
// @Tags authentication
// @Summary Get current user in the system
// @Accept json
// @Produce json
// @Success 200 {object} Response[CurrentUserResponse]
// @Router /auth.me [get]
func (a AuthenticationHandler) Me(c *fiber.Ctx) error {
	userId, err := GetCurrentUser(c)

	if err != nil {
		return err
	}

	user, err := a.authService.Me(*userId)

	if err != nil {
		return err
	}

	return Ok(c, CurrentUserResponse{
		ID:        user.ID,
		Username:  user.Username,
		Role:      (string)(user.Role),
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	})
}
