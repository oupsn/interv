package loaders

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/domains"
	"fmt"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

var MINIO *minio.Client

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
		err := DB.AutoMigrate(&domains.User{}, &domains.CodingQuestion{}, &domains.CodingQuestionExample{}, &domains.CodingQuestionTestCase{}) //TODO: Add more models here
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

	return gorm.Open(postgres.Open(dsn))
}

func SetupMinio() {
	fmt.Println(fmt.Sprintf("[MINIO] Connecting to %s", viper.GetString(EnvMinioEndpoint)))
	endpoint := viper.GetString(EnvMinioEndpoint)
	accessKeyID := viper.GetString(EnvMinioAccessKey)
	secretAccessKey := viper.GetString(EnvMinioSecretKey)
	useSSL := true

	minioClient, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		panic(err)
	}

	MINIO = minioClient
}
