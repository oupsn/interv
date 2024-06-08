package handlers

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
)

func HealthCheck(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(map[string]interface{}{
		"Success": true,
		"Status":  "Success and Healthy!",
	})
}
