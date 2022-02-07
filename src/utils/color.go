package utils

import "fmt"

func red(words string) string {
	return fmt.Sprintf("\033[1;31;40m%s\033[0m", words)
}

func green(words string) string {
	return fmt.Sprintf("\033[1;32;40m%s\033[0m", words)
}

func yellow(words string) string {
	return fmt.Sprintf("\033[1;33;40m%s\033[0m", words)
}

func blue(words string) string {
	return fmt.Sprintf("\033[1;34;40m%s\033[0m", words)
}
