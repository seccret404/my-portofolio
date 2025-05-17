package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	// Load variabel dari .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Ambil koneksi string dari env
	dbSource := os.Getenv("DB_SOURCE")
	if dbSource == "" {
		log.Fatal("DB_SOURCE tidak ditemukan di .env")
	}

	// Koneksi ke PostgreSQL
	db, err := sql.Open("postgres", dbSource)
	if err != nil {
		log.Fatal("Gagal konek ke database:", err)
	}
	defer db.Close()

	// Test koneksi
	err = db.Ping()
	if err != nil {
		log.Fatal("Database tidak bisa di-ping:", err)
	}
	log.Println("✅ Connected to PostgreSQL")

	// Setup Fiber
	app := fiber.New()

	// Endpoint tes aja dulu
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Server jalan 🚀")
	})

	// Jalankan server
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Println("🚀 Server running at http://localhost:" + port)
	log.Fatal(app.Listen(":" + port))
}
