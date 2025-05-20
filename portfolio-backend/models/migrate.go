package models

import "github.com/seccret404/portofolio-backend/config"

func MigrateAll() {
	err := config.DB.AutoMigrate(
		&User{},
		&Project{},
		
	)

	if err != nil{
		panic("Migrate failed: " + err.Error())
	}
}