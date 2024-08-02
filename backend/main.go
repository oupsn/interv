package main

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/loaders"
)

func main() {
	loaders.SetupDatabases()
	loaders.SetupRoutes()
}
