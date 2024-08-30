package main

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/loaders"
)

// @title Interv API
// @version 1.0
// @BasePath /api
func main() {
	loaders.SetupDatabases()
	loaders.SetupMinio()
	loaders.SetupMailjet()
	loaders.SetupRoutes()
}
