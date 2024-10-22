package repositories

import "csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"

type IPortalRepository interface {
	Create(portal domains.Portal) (newPortal *domains.Portal, err error)
	AddUserToPortal(user domains.User, portal domains.Portal) (err error)
	FindUserByPortal(portalId uint) (userInportal []*domains.User, err error)
	FindByTitle(title string) (portal *domains.Portal, err error)
	FindById(id uint) (portal *domains.Portal, err error)
	DeleteById(id uint) (err error)
}
