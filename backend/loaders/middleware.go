package loaders

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

func JwtAuthentication(c *fiber.Ctx) error {
	token := c.Cookies("token", "")
	_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return []byte(viper.GetString("JWT_SECRET")), nil
	})

	if err != nil {
		println("Error: ", err.Error())
		return fiber.NewError(fiber.StatusUnauthorized, err.Error())
	}

	return c.Next()
}
