package handlers

import "time"

type UserData struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
} // @name User

type CreateUserBody struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
	Role     string `json:"role" validate:"required"`
} // @name UserCreateBody

type DeleteUserBody struct {
	Id uint `json:"id" validate:"required"`
} // @name UserDeleteBody
