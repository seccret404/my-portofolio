package services

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/seccret404/portofolio-backend/config"
	"github.com/seccret404/portofolio-backend/models"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(name, email, password string) (*models.User, error) {
	hashsedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)

	if err != nil {
		return nil, err
	}

	user := &models.User{
		Name:     name,
		Email:    email,
		Password: string(hashsedPassword),
	}

	result := config.DB.Create(user)
	if err != nil {
		return nil, result.Error
	}

	return user, nil
}

func LoginUser(email, password string) (string, error) {
	var user models.User
	result := config.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return "", errors.New("email pass failed")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		return "", errors.New("email pass failed")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return "", err
	}

	return tokenString, err
}
