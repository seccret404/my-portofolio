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

func GeyByIDProjectService(id string)(*models.Project, error){
	var project models.Project
	if err := config.DB.First(&project, id).Error; err != nil{
		return nil, err
	}

	return &project, nil
}

func UpdateProjectService(id string, updateData *models.Project)(*models.Project, error){
	var project models.Project
	if err := config.DB.First(&project, id).Error; err !=  nil{
		return nil, err
	}

	project.Name = updateData.Name
	project.Desc = updateData.Desc
	project.Feature = updateData.Feature
	project.Stack = updateData.Stack
	project.Link = updateData.Link
	project.Periode = updateData.Periode
	
	if updateData.Image != ""{
		project.Image = updateData.Image
	}

	if err := config.DB.Save(&project).Error; err != nil{
		return nil, err
	}

	return &project, nil
}