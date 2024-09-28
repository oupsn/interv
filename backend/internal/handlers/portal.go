package handlers

type PortalData struct {
	Id          uint   `json:"id"`
	CompanyName string `json:"companyName"`
} // @name PortalData

type CreatePortalBody struct {
	CompanyName string `json:"company_name" validate:"required"`
} // @name CreatePortalBody

type GetPortalBody struct {
	Id uint `json:"id" validate:"required"`
} // @name GetPortalBody

type DeletePortalBody struct {
	Id uint `json:"id" validate:"required"`
} // @name DeletePortalBody
