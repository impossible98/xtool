package config

import (
	"os"
	"path/filepath"

	"xtool/src/constants"
)

var homeDir, _ = os.UserHomeDir()
var logPath = filepath.Join(homeDir, ".config", constants.BinName, constants.BinName+".log")
