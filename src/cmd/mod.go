package cmd

import (
	"os"
)

func Mod() {
	if len(os.Args) == 1 {
		main()
	} else if len(os.Args) == 2 {
		if os.Args[1] == "version" {
			version()
		} else {
			help()
		}
	} else {
		help()
	}
}
