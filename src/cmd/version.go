package cmd

import (
	"fmt"

	"xtool/src/constants"
)

func version() {
	fmt.Printf("%s version: %s\n", constants.AppName, constants.Version)
}
