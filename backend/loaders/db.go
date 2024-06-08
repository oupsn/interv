package loaders

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/db"
	"fmt"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDatabases() {
	CheckAndConnectDatabase()
	CheckAutoMigrate()
	CreateDefaultAdminUser()
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

func CreateDefaultAdminUser() *domains.User {
	// Create default general user
	var user domains.User
	DB.Where(domains.User{
		Username: &Env.AdminUsername,
	}).Attrs(domains.User{
		Password:   &Env.AdminPassword,
		Role:       &domains.UserRoleAdmin,
		Department: &Env.AdminDepartment,
	}).FirstOrCreate(&user)
	// Create default general user
	fmt.Println(fmt.Sprintf("[DB] Creating default admin user \"%s\"", *user.Username))
	return &user
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
