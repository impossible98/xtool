APP_NAME := xTool
BIN_NAME := xtool
APP_VERSION := 0.0.1

SHELL := env /bin/bash

all:
	@node ./scripts/all.js

build: fmt
	go build -ldflags "-s -w" -o ./dist/$(BIN_NAME) ./src/main.go
	@echo "Build success"

build-darwin:
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags "-s -w" -o ./dist/$(BIN_NAME)-darwin-amd64 ./src/main.go

build-linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -o ./dist/$(BIN_NAME)-linux-amd64 ./src/main.go

build-windows:
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -ldflags "-s -w" -o ./dist/$(BIN_NAME)-windows-amd64.exe ./src/main.go

dev:
	go build -o ./dist/$(BIN_NAME) ./src/main.go
	./dist/$(BIN_NAME)

fmt:
	go fmt ./src/...

lint:
	go vet ./src/...

release: build-darwin build-linux build-windows
	cd dist; \
	zip ./$(BIN_NAME)-darwin-amd64.zip $(BIN_NAME)-darwin-amd64; \
	zip ./$(BIN_NAME)-linux-amd64.zip $(BIN_NAME)-linux-amd64; \
	zip ./$(BIN_NAME)-windows-amd64.zip $(BIN_NAME)-windows-amd64.exe
	@echo "Release success"

start:
	@./dist/$(BIN_NAME)
