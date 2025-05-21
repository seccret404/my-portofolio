package models

import "gorm.io/gorm"

type Experience struct {
	gorm.Model
	Company		string `json:"company"`
	Role 		string `json:"role"`
	Periode		string `json:"periode"`
	Contribution	string `json:"contribution"`
	Stack		string `json:"stack"`
}