package utils

import "github.com/gofiber/fiber/v2"

func Ok(c *fiber.Ctx, data interface{})error{
	return c.Status(fiber.StatusOK).JSON(data)
}

func Created(c *fiber.Ctx, message string, data interface{}) error {
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": message,
		"data":    data,
	})
}


func Unauthorized(c *fiber.Ctx, message string)error{
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"error" : message,
	})
}

func BadRequest(c *fiber.Ctx, message string)error{
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"error" : message,
	})
}

func NotFound(c *fiber.Ctx, message string)error{
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
		"status" : "error",
		"message" : message,
	})
}