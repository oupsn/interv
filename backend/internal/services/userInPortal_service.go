package services

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/repositories"
)

type IUserInPortalService interface {
	GetUserInPortalByPortalId(id uint) (userInPortal *[]domains.UserInPortal, err error)
	GetUserInPortalByUserId(id uint) (userInPortal *domains.UserInPortal, err error)
	GetPortalByUserId(userId uint) (portalId uint, err error)
	Create(userId uint, portalId uint) (userInPortal *domains.UserInPortal, err error)
	Delete(id uint) (err error)
}

type userInPortalService struct {
	userInPortalRepository repositories.IUserInPortalRepository
}

func NewUserInPortalService(userInPortalRepository repositories.IUserInPortalRepository) IUserInPortalService {
	return &userInPortalService{
		userInPortalRepository: userInPortalRepository,
	}
}

func (p *userInPortalService) GetUserInPortalByPortalId(id uint) (userInPortal *[]domains.UserInPortal, err error) {
	userInPortal, err = p.userInPortalRepository.FindByPortalId(id)
	if err != nil {
		return nil, err
	}
	return userInPortal, nil
}

func (p *userInPortalService) GetUserInPortalByUserId(id uint) (userInPortal *domains.UserInPortal, err error) {
	userInPortal, err = p.userInPortalRepository.FindByUserId(id)
	if err != nil {
		return nil, err
	}
	return userInPortal, nil
}

func (p *userInPortalService) GetPortalByUserId(userId uint) (portalId uint, err error) {
	userInPortal, err := p.userInPortalRepository.FindByUserId(userId)
	if err != nil {
		return 0, err
	}
	return userInPortal.PortalId, nil
}

func (p *userInPortalService) Create(userId uint, portalId uint) (portal *domains.UserInPortal, err error) {

	if _, err := p.userInPortalRepository.FindByUserAndPortalId(userId, portalId); err == nil {
		return nil, ErrorUserInPortal
	}

	return p.userInPortalRepository.Create(domains.UserInPortal{
		UserId:   userId,
		PortalId: portalId,
	})
}

func (p *userInPortalService) Delete(id uint) (err error) {
	return p.userInPortalRepository.DeleteById(id)
}
