package handlers

import "time"

type UserData struct {
	ID         *uint      `json:"id" validate:"required"`
	Username   *string    `json:"username" validate:"required"`
	Department *string    `json:"department" validate:"required"`
	Role       *string    `json:"role" validate:"required"`
	CreatedAt  *time.Time `json:"created_at" validate:"required"`
	UpdatedAt  *time.Time `json:"updated_at" validate:"required"`
} // @name User

type CreateUserBody struct {
	Username   *string `json:"username" validate:"required"`
	Password   *string `json:"password" validate:"required"`
	Department *string `json:"department" validate:"required"`
	Role       *string `json:"role" validate:"required"`
} // @name UserCreateBody

type DeleteUserBody struct {
	ID *uint `json:"id" validate:"required"`
} // @name UserDeleteBody
