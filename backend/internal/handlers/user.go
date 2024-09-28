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
	User     domains.User `json:"user" validate:"required"`
	PortalId uint         `json:"portalId" validate:"required"`
} // @name AdminCreateBody

type DeleteUserBody struct {
	Id uint `json:"id" validate:"required"`
} // @name UserDeleteBody
