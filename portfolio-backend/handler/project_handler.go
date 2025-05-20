package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/seccret404/portofolio-backend/cloudinary"
	"github.com/seccret404/portofolio-backend/models"
	"github.com/seccret404/portofolio-backend/services"
	"github.com/seccret404/portofolio-backend/utils"
)

func CreateProject(c *fiber.Ctx) error {
	// Get form values
	name := c.FormValue("name")
	desc := c.FormValue("desc")
	periode := c.FormValue("periode")
	feature := c.FormValue("feature")
	stack := c.FormValue("stack")
	link := c.FormValue("link")

	// Handle file upload
	fileHeader, err := c.FormFile("image")
	if err != nil {
		return utils.BadRequest(c, "Image is required")
	}

	imageUrl, err := cloudinary.UploadToCoudinary(fileHeader)
	if err != nil {
		return utils.BadRequest(c, "Failed to upload image")
	}

	// Get user_id from context (set by middleware)
	userID, ok := c.Locals("user_id").(string)
	if !ok || userID == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not authenticated",
		})
	}

	// Convert userID to uint
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user_id format",
		})
	}

	// Create project
	project := models.Project{
		Name:    name,
		Desc:    desc,
		Periode: periode,
		Feature: feature,
		Stack:   stack,
		Image:   imageUrl,
		Link:    link,
		UserID:  uint(userIDUint),
	}

	newProject, err := services.CreateProjectService(&project)
	if err != nil {
		return utils.BadRequest(c, "Failed to create project")
	}

	return utils.Created(c, "Project created successfully", newProject)
}

func GetProject(c *fiber.Ctx) error {
	projects, err := services.GetProjectService()
	if err != nil {
		return utils.BadRequest(c, "gagal dapatin project")
	}

	return utils.Ok(c, projects)
}

func GeyByIDProject(c *fiber.Ctx) error {
	var id = c.Params("id")
	project, err := services.GeyByIDProjectService(id)
	if err != nil {
		return utils.NotFound(c, "Ga nemu")
	}

	return utils.Ok(c, project)
}

func UpdateProject(c *fiber.Ctx) error {
	var id = c.Params("id")

	project, err := services.GeyByIDProjectService(id)
	if err != nil {
		return utils.NotFound(c, err.Error())
	}

	//input dari form
	if name := c.FormValue("name"); name != "" {
		project.Name = name
	}
	if desc := c.FormValue("desc"); desc != "" {
		project.Desc = desc
	}
	if periode := c.FormValue("periode"); periode != "" {
		project.Periode = periode
	}
	if feature := c.FormValue("feature"); feature != "" {
		project.Feature = feature
	}
	if stack := c.FormValue("stack"); stack != "" {
		project.Stack = stack
	}
	if link := c.FormValue("link"); link != "" {
		project.Link = link
	}

	//optional image
	file, err := c.FormFile("image")
	if err != nil && file != nil {
		imageUrl, err := cloudinary.UploadToCoudinary(file)
		if err != nil {
			return utils.BadRequest(c, "Gagal upload")
		}

		project.Image = imageUrl
	}

	updateProject, err := services.UpdateProjectService(id, project)
	if err != nil {
		return utils.BadRequest(c, "gagal nyimpan")
	}

	return utils.Ok(c, updateProject)
}
