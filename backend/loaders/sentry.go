package loaders

import (
	"github.com/getsentry/sentry-go"
	"github.com/spf13/viper"
	"time"
)

func SetupSentry() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn: viper.GetString(SENTRY_DSN),
		// Enable printing of SDK debug messages.
		// Useful when getting started or trying to figure something out.
		Debug:       true,
		Environment: viper.GetString(EnvMode),
	})
	if err != nil {
		panic(err)
	}
	// Flush buffered events before the program terminates.
	// Set the timeout to the maximum duration the program can afford to wait.
	defer sentry.Flush(2 * time.Second)
}
