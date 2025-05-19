package main

import (
	"log"
	"os"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/seccret404/portofolio-backend/config"
	"github.com/seccret404/portofolio-backend/models"
)

func main() {
	if err := godotenv.Load(); err != nil{
		log.Fatal("Error load env")
	}
	 config.ConnectDB()
	 models.MigrateAll()

	port := os.Getenv("PORT")
	if port == ""{
		port = "3000"
	}

	app := fiber.New()

	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
