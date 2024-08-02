package loaders

import (
	"fmt"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/db"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDatabases() {
	CheckAndConnectDatabase()
	CheckAutoMigrate()
}

func CheckAndConnectDatabase() {
	database, err := db.NewDatabase(db.DatabaseConfig{
		Host:     Env.DBHost,
		Port:     Env.DBPort,
		Username: Env.DBUsername,
		Password: Env.DBPassword,
		Name:     Env.DBName,
		Timezone: Env.DBTimezone,
	})

	DB = database

	if err != nil {
		panic(fmt.Errorf("fatal connecting to database: %w", err))
	}
}

func CheckAutoMigrate() {
	if Env.DBAutoMigrate {
		fmt.Println(fmt.Sprintf("[DB] Automigrate enabled"))
		err := DB.AutoMigrate(&domains.User{}) //TODO: Add more models here
		if err != nil {
			panic(err)
		}
		fmt.Println(fmt.Sprintf("[DB] Automigrated."))
	}
}
