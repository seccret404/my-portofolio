package services

import (
	"github.com/seccret404/portofolio-backend/config"
	"github.com/seccret404/portofolio-backend/models"
)

func CreateExService(experience *models.Experience)(*models.Experience, error){
	if err := config.DB.Create(experience).Error; err != nil{
		return nil, err
	}

	return experience, nil
}

func GetExService()([]models.Experience, error){
	var experience []models.Experience
	if err := config.DB.Find(&experience).Error; err != nil{
		return nil, err
	}

	return experience, nil

}

func GetByIDExService(id string)(*models.Experience, error){
	var experience models.Experience
	if err := config.DB.First(&experience, id).Error; err != nil{
		return nil, err
	}

	return &experience, nil
}

func UpdateExService(id string, updateData *models.Experience)(*models.Experience, error){
	var exp models.Experience
	if err := config.DB.First(&exp, id).Error; err != nil{
		return nil, err
	}

	exp.Company = updateData.Company
	exp.Role	= updateData.Role
	exp.Contribution = updateData.Contribution
	exp.Periode	= updateData.Periode
	exp.Stack		= updateData.Stack

	if err := config.DB.Save(&exp).Error; err != nil{
		return nil, err
	}

	return &exp, nil
	
}
