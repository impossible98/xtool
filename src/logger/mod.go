package logger

import (
	"fmt"
	"os"
	"time"

	"xtool/src/config"
	"xtool/src/utils"
)

var date = time.Now().UTC().Format("2006-01-02 15:04:05")

func Debug(format string, v ...interface{}) {
	message := fmt.Sprintf(date+" [DEBUG] "+format, v...)
	colorMessage := fmt.Sprintf(date+utils.Blue(" [DEBUG] ")+format, v...)
	if config.DefaultConfig.Log {
		writeLog(message + "\n")
	}
	fmt.Fprintf(os.Stderr, colorMessage+"\n")
}

func Info(format string, v ...interface{}) {
	message := fmt.Sprintf(date+" [INFO] "+format, v...)
	colorMessage := fmt.Sprintf(date+utils.Green(" [INFO] ")+format, v...)
	if config.DefaultConfig.Log {
		writeLog(message + "\n")
	}
	fmt.Fprintf(os.Stderr, colorMessage+"\n")
}

func Error(format string, v ...interface{}) {
	message := fmt.Sprintf(date+" [ERROR] "+format, v...)
	colorMessage := fmt.Sprintf(date+utils.Red(" [ERROR] ")+format, v...)
	if config.DefaultConfig.Log {
		writeLog(message + "\n")
	}
	fmt.Fprintf(os.Stderr, colorMessage+"\n")
}

func Fatal(format string, v ...interface{}) {
	message := fmt.Sprintf(date+" [FATAL] "+format, v...)
	colorMessage := fmt.Sprintf(date+utils.Yellow(" [FATAL] ")+format, v...)
	if config.DefaultConfig.Log {
		writeLog(message + "\n")
	}
	fmt.Fprintf(os.Stderr, colorMessage+"\n")
	os.Exit(1)
}

func writeLog(words string) {
	filePath := config.DefaultConfig.LogPath
	if !utils.FileExist(filePath) {
		utils.FileCreate(filePath)
	}
	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println(err)
	}
	_, err = file.Write([]byte(words))
	if err != nil {
		file.Close()
		fmt.Println(err)
	}
}
