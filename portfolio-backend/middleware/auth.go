package middleware

import (
	"os"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func AuthVerified(c *fiber.Ctx)error{
	tokenStr := c.Get("Authorization")
	if tokenStr == ""{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error" : "Missing token",
 		})
	}
	
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token)(interface{}, error){
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || token.Valid{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error" : "invalid login",
		})
	}

	return c.Next()
}