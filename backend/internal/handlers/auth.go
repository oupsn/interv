package handlers

import "time"

type LoginBody struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
} // @name LoginBody

type CurrentUserResponse struct {
	ID        uint      `json:"id"  validate:"required"`
	Username  string    `json:"username" validate:"required"`
	Role      string    `json:"role" validate:"required"`
	CreatedAt time.Time `json:"created_at" validate:"required"`
	UpdatedAt time.Time `json:"updated_at" validate:"required"`
} // @name CurrentUserResponse
