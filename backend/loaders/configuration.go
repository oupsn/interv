package loaders

import (
	"fmt"
	"github.com/spf13/viper"
	"strings"
)

type ConfigEnv struct {
	AdminDepartment  string `json:"ADMIN_DEPARTMENT" mapstructure:"ADMIN_DEPARTMENT"`
	AdminPassword    string `json:"ADMIN_PASSWORD" mapstructure:"ADMIN_PASSWORD"`
	AdminUsername    string `json:"ADMIN_USERNAME" mapstructure:"ADMIN_USERNAME"`
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
