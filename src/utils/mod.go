package utils

func Blue(words string) string {
	return blue(words)
}

func Green(words string) string {
	return green(words)
}

func Red(words string) string {
	return red(words)
}

func Yellow(words string) string {
	return yellow(words)
}

func FileCreate(path string) {
	create(path)
}

func FileExist(path string) bool {
	return exist(path)
}
