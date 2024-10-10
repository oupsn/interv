package repositories

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type workspaceRepository struct {
	DB gorm.DB
}

func NewWorkspaceRepository(db gorm.DB) IWorkspaceRepository {
	return &workspaceRepository{
		DB: db,
	}
}

func (w *workspaceRepository) Create(workspace domains.Workspace) (newWorkspace *domains.Workspace, err error) {

	if err := w.DB.Clauses(clause.Returning{}).Create(&workspace).Error; err != nil {
		return nil, err
	}

	return &workspace, nil
}

func (w *workspaceRepository) FindByTitle(title string) (workspace *domains.Workspace, err error) {
	foundWorkspace := new(domains.Workspace)
	if err := w.DB.First(&foundWorkspace, "title = ? ", title).Error; err != nil {
		return nil, err
	}
	return foundWorkspace, nil
}

func (w *workspaceRepository) FindById(id uint) (workspace *domains.Workspace, err error) {
	foundWorkspace := new(domains.Workspace)
	if err := w.DB.First(&foundWorkspace, "id = ?", id).Error; err != nil {
		return nil, err
	}
	if err := w.DB.Preload("VideoQuestion").First(&foundWorkspace, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return foundWorkspace, nil
}

func (w *workspaceRepository) FindByPortalId(portal_id *uint) (workspace *[]domains.Workspace, err error) {
	foundWorkspace := new([]domains.Workspace)
	if err := w.DB.Find(&foundWorkspace, "portal_id = ? ", portal_id).Error; err != nil {
		return nil, err
	}
	return foundWorkspace, nil
}

func (w *workspaceRepository) FindWorkspaceIdByPortalId(portal_id *uint) (workspace *[]uint, err error) {
	workspaceIds := new([]uint)
	if err := w.DB.Model(&domains.Workspace{}).Where("portal_id = ?", portal_id).Pluck("id", workspaceIds).Error; err != nil {
		return nil, err
	}
	return workspaceIds, nil
}

func (w *workspaceRepository) DeleteById(id uint) (err error) {
	if err := w.DB.Delete(&domains.Workspace{}, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}
