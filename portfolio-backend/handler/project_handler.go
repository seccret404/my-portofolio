package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/seccret404/portofolio-backend/cloudinary"
	"github.com/seccret404/portofolio-backend/models"
	"github.com/seccret404/portofolio-backend/services"
	"github.com/seccret404/portofolio-backend/utils"
)

func CreateProject(c *fiber.Ctx)error{
	name		:= c.FormValue("name")
	desc		:= c.FormValue("desc")
	periode 	:= c.FormValue("periode")
	feature	:= c.FormValue("feature")
	stack	:= c.FormValue("stack")
	link 	:= c.FormValue("link")

	fileHeader, err := c.FormFile("image")
	if err != nil{
		return utils.BadRequest(c, "image is requiried")
	}

	imageUrl, err := cloudinary.UploadToCoudinary(fileHeader)
	if err != nil{
		return utils.BadRequest(c, "gagal upload file")
	}

	project := models.Project{
		Name: name,
		Desc: desc,
		Periode: periode,
		Feature: feature,
		Stack: stack, 
		Image: imageUrl,
		Link: link,
		UserID: "1",
	}

	newProject, err := services.CreateProjectService(&project)
	if err != nil{
		return utils.BadRequest(c, "gagal nambah project")
	}

	return utils.Created(c, "Berhasil nambah projecy", newProject)

}

func GetProject(c *fiber.Ctx)error{
	projects, err := services.GetProjectService()
	if err != nil{
		return utils.BadRequest(c, "gagal dapatin project")
	}

	return utils.Ok(c, projects)
}