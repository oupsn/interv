package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type portalRepository struct {
	DB gorm.DB
}

func NewPortalRepository(db gorm.DB) IPortalRepository {
	return &portalRepository{
		DB: db,
	}
}

func (p *portalRepository) Create(portal domains.Portal) (newPortal *domains.Portal, err error) {

	if err := p.DB.Clauses(clause.Returning{}).Create(&portal).Error; err != nil {
		return nil, err
	}

	return &portal, nil
}

func (p *portalRepository) AddUserToPortal(user domains.User, portal domains.Portal) (err error) {
	err = p.DB.Model(&domains.User{ID: user.ID}).Association("Portal").Append(&domains.Portal{Id: portal.Id})
	if err != nil {
		return err
	}
	return nil
}

func (p *portalRepository) FindUserByPortal(portalId uint) (userInportal []*domains.User, err error) {
	foundPortal := new(domains.Portal)
	if err := p.DB.Find(&foundPortal, "id = ? ", portalId).Error; err != nil {
		return nil, err
	}
	return foundPortal.UserInPortal, nil
}

func (p *portalRepository) FindByTitle(title string) (portal *domains.Portal, err error) {
	foundportal := new(domains.Portal)
	if err := p.DB.First(&foundportal, "company_name = ? ", title).Error; err != nil {
		return nil, err
	}
	return foundportal, nil
}

func (p *portalRepository) FindById(id uint) (portal *domains.Portal, err error) {
	foundportal := new(domains.Portal)

	if err := p.DB.First(&foundportal, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return foundportal, nil
}

func (p *portalRepository) DeleteById(id uint) (err error) {
	if err := p.DB.Delete(&domains.Portal{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}
