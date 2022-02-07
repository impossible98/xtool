package config

type config struct {
	Log     bool
	LogPath string
}

var DefaultConfig = config{
	Log:     true,
	LogPath: logPath,
}
