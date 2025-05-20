package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/seccret404/portofolio-backend/services"
	"github.com/seccret404/portofolio-backend/utils"
)

type RegisterInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"Password"`
}

func Register(c *fiber.Ctx)error{
	var input RegisterInput
	if err := c.BodyParser(&input); err != nil{
		return utils.BadRequest(c, "invalid input")
	}

	user , err := services.RegisterUser(input.Name, input.Email, input.Password)
		if err != nil{
			return utils.BadRequest(c, err.Error())
		}

			return utils.Created(c,"Berhasil", fiber.Map{
				"message" : "success register",
				"user": fiber.Map{
					"id" : user.ID,
					"name" : user.Name,
					"email" : user.Email,
				},
			})
	
}


func Login(c *fiber.Ctx)error{
	var input LoginInput
	if err := c.BodyParser(&input);  err != nil{
		return utils.BadRequest(c, "gagal login")
	}

	token, err := services.LoginUser(input.Email, input.Password)
	if err != nil{
		return utils.Unauthorized(c, err.Error())
	}

	return utils.Ok(c, fiber.Map{
		"message" : "Login berhasil",
		"token" : token,
	})
}
