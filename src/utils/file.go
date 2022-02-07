package utils

import (
	"os"
	"path/filepath"
)

func exist(path string) bool {
	_, err := os.Lstat(path)
	return !os.IsNotExist(err)
}

func create(path string) {
	err := os.MkdirAll(filepath.Dir(path), os.ModePerm)
	if err != nil {
		panic(err)
	}
	file, err := os.Create(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()
}
