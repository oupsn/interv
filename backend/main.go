package main

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/loaders"
	"github.com/spf13/viper"
)

// @title Interv API
// @version 1.0
// @BasePath /api
func main() {
	loaders.SetupDatabases()
	loaders.SetupMinio()
	loaders.SetupRedis()
	loaders.SetupCron()
	if viper.GetString(loaders.EnvMode) != "sit" {
		loaders.SetupSentry()
		loaders.SetupMailjet()
	}
	loaders.SetupRoutes()
}
