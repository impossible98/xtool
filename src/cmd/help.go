package cmd

import (
	"fmt"

	"xtool/src/constants"
)

var helpCollection = map[string]string{
	"help":    "show this help",
	"version": "show the version",
}

func help() {
	fmt.Printf("Usage: %s [command]\n\n", constants.BinName)
	//
	for k, v := range helpCollection {
		fmt.Printf("  %s: %s\n", k, v)
		fmt.Printf("\n")
	}
}
