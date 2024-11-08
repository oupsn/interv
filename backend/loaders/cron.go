package loaders

import (
	"fmt"

	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/cronfunc"
	"github.com/robfig/cron/v3"
)

func SetupCron() {
	fmt.Println("[CRON] Setup cron")

	c := cron.New()
	cronfunc.RunPlagiarismCheck(*DB)
	// This cron will run every day at 00:00:00 naja
	c.AddFunc("0 0 * * *", func() {
		cronfunc.RunPlagiarismCheck(*DB)
	})
	c.Start()
	fmt.Println("[CRON] Cron started")
}
