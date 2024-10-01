package handlers

import (
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
)

type UserData struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Username  string    `json:"username"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
} // @name User

type CreateUserBody struct {
	ListUser    []domains.User `json:"listUser" validate:"required"`
	WorkspaceId uint           `json:"workspaceId" validate:"required"`
} // @name UserCreateBody

type CreateAdminBody struct {
	Name     string `json:"name" validate:"required"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
	Role     string `json:"role" validate:"required"`
	PortalId uint   `json:"portalId" validate:"required"`
} // @name AdminCreateBody

type DeleteUserBody struct {
	Id uint `json:"id" validate:"required"`
} // @name UserDeleteBody
