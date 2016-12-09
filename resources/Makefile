export PATH := $(PATH):node_modules/.bin

SOURCES = \
	$(wildcard src/goodlifetheme/*) \
	src/goodlifetheme/icons \
	webpack.config.js

all: build

build: clean node_modules $(SOURCES)
	webpack

watch: clean node_modules $(SOURCES)
	webpack-dev-server

clean:
	$(RM) -r theme/*

###

.PHONY: all build watch clean

node_modules: package.json
	npm install
	touch node_modules

src/goodlifetheme/icons: node_modules fontello.json
	fontello-svg --config fontello.json --no-css --verbose \
	  --out src/goodlifetheme/icons \
	  --fill-colors "black:rgb(0,0,0)|white:rgb(255,255,255)"
