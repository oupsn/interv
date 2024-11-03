package loaders

import (
	"csgit.sit.kmutt.ac.th/interv/interv-platform/internal/utils/cronfunc"
	"github.com/robfig/cron/v3"
)

func SetupCron() {
	c := cron.New()
	c.AddFunc("0 0 * * *", func() {
		cronfunc.RunPlagiarismCheck(DB)
	})
	c.Start()
}
