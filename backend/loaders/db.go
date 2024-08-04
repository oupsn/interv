package loaders

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/t"
	"fmt"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"time"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDatabases() {
	CheckAndConnectDatabase()
	CheckAutoMigrate()
}

func CheckAndConnectDatabase() {
	database, err := NewDatabase(DatabaseConfig{
		Host:     viper.GetString(EnvDBHost),
		Port:     viper.GetInt(EnvDBPort),
		Username: viper.GetString(EnvDBUsername),
		Password: viper.GetString(EnvDBPassword),
		Name:     viper.GetString(EnvDBName),
	})

	DB = database

	if err != nil {
		panic(fmt.Errorf("fatal connecting to database: %w", err))
	}
}

func CheckAutoMigrate() {
	if viper.GetBool(EnvDBAutoMigrate) {
		fmt.Println(fmt.Sprintf("[DB] Automigrate enabled"))
		err := DB.AutoMigrate(&domains.User{}) //TODO: Add more models here
		if err != nil {
			panic(err)
		}
		fmt.Println(fmt.Sprintf("[DB] Automigrated."))
	}
}

type DatabaseConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	Name     string
	Timezone string
}

func NewDatabase(config DatabaseConfig) (*gorm.DB, error) {
	fmt.Println(fmt.Sprintf("[DB] Connecting to %s", config.Host))
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v sslmode=disable TimeZone=Asia/Bangkok", config.Host, config.Username, config.Password, config.Name, config.Port)

	return gorm.Open(postgres.Open(dsn), &gorm.Config{
		NowFunc: func() time.Time {
			return time.Now().In(t.BangkokTime)
		},
	})
}
