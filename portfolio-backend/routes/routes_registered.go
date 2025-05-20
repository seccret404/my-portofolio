package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/seccret404/portofolio-backend/handler"
)

func RegisteredRoutes(app *fiber.App){
	routeGroup := app.Group("/api")
	// auth 
	routeGroup.Post("/register", handler.Register)
	routeGroup.Post("/login", handler.Login)

	//project
	routeGroup.Post("/create-project", handler.CreateProject)
	routeGroup.Get("/get-project", handler.GetProject)
	routeGroup.Get("/get-project/:id", handler.GeyByIDProject)
	routeGroup.Put("/update-project/:id", handler.UpdateProject)
	

}