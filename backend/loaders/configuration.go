package loaders

import (
	"fmt"
	"github.com/spf13/viper"
)

const (
	EnvServerHost       = "SERVER_HOST"
	EnvServerOrigins    = "SERVER_ORIGINS"
	EnvServerPort       = "SERVER_PORT"
	EnvDBAutoMigrate    = "DB_AUTOMIGRATE"
	EnvDBHeadless       = "DB_HEADLESS"
	EnvDBHost           = "DB_HOST"
	EnvDBName           = "DB_NAME"
	EnvDBPassword       = "DB_PASSWORD"
	EnvDBPort           = "DB_PORT"
	EnvDBUrl            = "DB_URL"
	EnvDBUsername       = "DB_USERNAME"
	EnvJwtSecret        = "JWT_SECRET"
	EnvMode             = "ENV"
	EnvMinioEndpoint    = "MINIO_ENDPOINT"
	EnvMinioAccessKey   = "MINIO_ACCESS_KEY"
	EnvMinioSecretKey   = "MINIO_SECRET_KEY"
	EnvCompilerEndpoint = "COMPILER_ENDPOINT"
)

func init() {
	BootConfiguration()
}

func BootConfiguration() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("[CONFIG] config.yaml not found in the current path, will use ENVs instead.")
		viper.AutomaticEnv()
	}
	fmt.Println(fmt.Sprintf("[CONFIG] Loaded Configuration."))
}
