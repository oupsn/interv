package handlers

import (
	"github.com/gofiber/fiber/v2"
	"time"
)

type Response[T any] struct {
	Code      int       `json:"code"`
	Data      T         `json:"data,omitempty"`
	Message   string    `json:"message,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type ResponseWithMeta[T any, K any] struct {
	Code      int       `json:"code"`
	Data      T         `json:"data,omitempty"`
	Meta      K         `json:"meta,omitempty"`
	Message   string    `json:"message,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type OkResponse struct {
	Code      int       `json:"code"`
	Message   string    `json:"message,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type ErrResponse struct {
	Code      int       `json:"code"`
	Message   string    `json:"message,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

func Ok[T any](ctx *fiber.Ctx, data T, meta ...any) error {
	if len(meta) > 0 {
		return ctx.Status(200).JSON(ResponseWithMeta[T, any]{
			Code:      fiber.StatusOK,
			Data:      data,
			Meta:      meta[0],
			Timestamp: time.Now(),
		})
	}

	return ctx.Status(200).JSON(Response[T]{
		Code:      fiber.StatusOK,
		Data:      data,
		Timestamp: time.Now(),
	})
}

func Created[T any](ctx *fiber.Ctx, data T, meta ...any) error {
	if len(meta) > 0 {
		return ctx.Status(200).JSON(ResponseWithMeta[T, any]{
			Code:      fiber.StatusCreated,
			Data:      data,
			Meta:      meta[0],
			Timestamp: time.Now(),
		})
	}

	return ctx.Status(200).JSON(Response[T]{
		Code:      fiber.StatusCreated,
		Data:      data,
		Timestamp: time.Now(),
	})
}