package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/seccret404/portofolio-backend/models"
	"github.com/seccret404/portofolio-backend/services"
	"github.com/seccret404/portofolio-backend/utils"
)

func CreateExperience(c *fiber.Ctx) error{
	company := c.FormValue("company")
	role	:= c.FormValue("role")
	periode := c.FormValue("periode")
	contribution :=  c.FormValue("contribution")
	stack := c.FormValue("stack")

	experience := models.Experience{
		Company: company,
		Role: role,
		Periode: periode,
		Contribution: contribution,
		Stack: stack,
	}

	newExp, err := services.CreateExService(&experience)
	if err != nil{
		return utils.BadRequest(c, "Gagal nambah exp")
	}

	return utils.Created(c, "Berhasil nambah exp", newExp)

}

func GetExperience(c *fiber.Ctx) error{
	experience, err := services.GetExService()
	if err != nil{
		return utils.BadRequest(c, "Ga bisa dapatin data")
	}

	return utils.Ok(c, experience)
}

func GetByIDExperience(c *fiber.Ctx)error{
	var id = c.Params("id")

	experience, err := services.GetByIDExService(id)
	if err != nil{
		return utils.NotFound(c, err.Error())
	}

	return utils.Ok(c, experience)
}

func UpdateExperience(c *fiber.Ctx)error{
	var id = c.Params("id")
	experience, err := services.GetByIDExService(id)
	if err != nil{
		return utils.NotFound(c, err.Error())
	}

	if company := c.FormValue("company"); company != ""{
		experience.Company = company
	}
	if role := c.FormValue("role"); role != ""{
		experience.Role = role
	}
	if periode := c.FormValue("periode"); periode != ""{
		experience.Periode = periode
	}
	if stack := c.FormValue("stack"); stack != "" {
		experience.Stack = stack
	}

	updateExperience, err :=  services.UpdateExService(id, experience)
	if err != nil{
		return utils.BadRequest(c, "gagal nyimpan")
	}

	return utils.Ok(c, updateExperience)
	
}