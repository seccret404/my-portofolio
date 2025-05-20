package services

import (
	"github.com/seccret404/portofolio-backend/config"
	"github.com/seccret404/portofolio-backend/models"
)

func CreateProjectService(project *models.Project)(*models.Project, error){
	if err := config.DB.Create(project).Error; err != nil{
		return nil, err
	}

	return project, nil
}

func GetProjectService()([]models.Project, error){
	var projects []models.Project
	if err := config.DB.Find(&projects).Error; err != nil{
		return nil, err
	}

	return projects, nil
}

