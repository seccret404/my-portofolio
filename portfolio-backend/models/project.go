package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model
	Name		string `json:"name"`
	Desc		string `json:"desc"`
	Periode	string `json:"periode"`
	Feature	string `json:"feature"`
	Stack 	string `json:"stack"`
	Image	string `json:"image"`
	Link		string `json:"link"`
	UserID 	string `json:"user_id"`
}