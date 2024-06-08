package db

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/t"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
)

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
