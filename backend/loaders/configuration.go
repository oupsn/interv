package loaders

import (
	"fmt"
	"github.com/spf13/viper"
	"strings"
)

type ConfigEnv struct {
	AdminDepartment string `json:"ADMIN_DEPARTMENT" mapstructure:"ADMIN_DEPARTMENT"`
	AdminPassword   string `json:"ADMIN_PASSWORD" mapstructure:"ADMIN_PASSWORD"`
	AdminUsername   string `json:"ADMIN_USERNAME" mapstructure:"ADMIN_USERNAME"`
	ServerHost      string `json:"SERVER_HOST" mapstructure:"SERVER_HOST"`
	ServerOrigins   string `json:"SERVER_ORIGINS" mapstructure:"SERVER_ORIGINS"`
	ServerPort      int    `json:"SERVER_PORT" mapstructure:"SERVER_PORT"`
	DBAutoMigrate   bool   `json:"DB_AUTOMIGRATE" mapstructure:"DB_AUTOMIGRATE"`
	DBHeadless      bool   `json:"DB_HEADLESS" mapstructure:"DB_HEADLESS"`
	DBHost          string `json:"DB_HOST" mapstructure:"DB_HOST"`
	DBName          string `json:"DB_NAME" mapstructure:"DB_NAME"`
	DBPassword      string `json:"DB_PASSWORD" mapstructure:"DB_PASSWORD"`
	DBPort          int    `json:"DB_PORT" mapstructure:"DB_PORT"`
	DBTimezone      string `json:"DB_TIMEZONE" mapstructure:"DB_TIMEZONE"`
	DBUrl           string `json:"DB_URL" mapstructure:"DB_URL"`
	DBUsername      string `json:"DB_USERNAME" mapstructure:"DB_USERNAME"`
	JwtSecret       string `json:"JWT_SECRET" mapstructure:"JWT_SECRET"`
}

var Env *ConfigEnv

func init() {
	BootConfiguration()
}

func BootConfiguration() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("[CONFIG] config.yaml not found in the current path, will use ENVs instead.")
	}
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	if err := viper.Unmarshal(&Env); err != nil {
		panic(fmt.Errorf("[CONFIG] fatal loading configuration: %w, maybe due to invalid configuration format", err))
	}

	fmt.Println(fmt.Sprintf("[CONFIG] Loaded Configuration."))
}
