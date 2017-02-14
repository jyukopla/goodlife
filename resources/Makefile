export PATH := $(PATH):node_modules/.bin

SOURCES = \
	$(wildcard src/goodlifetheme/*) \
	src/goodlifetheme/icons \
	webpack.config.js

DEPLOY_HOST = jalava.cc.jyu.fi
DEPLOY_HASH = $(shell git rev-parse --short HEAD)
DEPLOY_PATH = /autowww/sovpa6/static.cc.jyu.fi/plone/goodlife-$(DEPLOY_HASH)

# Target site for upload
UPLOAD_URL ?= https://opiskelijankompassi.preview.jyu.fi
UPLOAD_FLAGS ?= --enable

all: build

build: node_modules $(SOURCES)
	webpack --progress --colors --bail

watch: node_modules $(SOURCES)
	$(RM) -r theme/*
	webpack-dev-server

clean:
	$(RM) -r theme/*

deploy: dist/$(DEPLOY_HASH)/goodlifetheme push-production

dist/$(DEPLOY_HASH)/goodlifetheme: $(SOURCES)
	DISTPATH=dist/$(DEPLOY_HASH) PUBLICPATH=https://static.cc.jyu.fi/plone/goodlife-$(DEPLOY_HASH)/ make build

push-production: dist/$(DEPLOY_HASH)/goodlifetheme
	ssh "$(DEPLOY_HOST)" test ! -d "$(DEPLOY_PATH)" \
		|| (echo "Error: $(DEPLOY_HOST):$(DEPLOY_PATH) already exists"; false)
	scp -r dist/$(DEPLOY_HASH)/goodlifetheme $(DEPLOY_HOST):$(DEPLOY_PATH)

upload: dist/$(DEPLOY_HASH)/goodlifetheme
ifndef UPLOAD_URL
	$(error "Missing required var: UPLOAD_URL")
endif
	plonetheme-upload dist/$(DEPLOY_HASH)/goodlifetheme $(UPLOAD_URL) $(UPLOAD_FLAGS)

upload-custom: dist/goodlifetheme-custom
ifndef UPLOAD_URL
	$(error "Missing required var: UPLOAD_URL")
endif
	plonetheme-upload dist/$(DEPLOY_HASH)/goodlifetheme-custom $(UPLOAD_URL)

###

.PHONY: all build watch clean

node_modules: package.json
	npm install
	touch node_modules

src/goodlifetheme/icons: node_modules fontello.json fontello-goodlife.json
	fontello-svg --config fontello.json --no-css --verbose \
	  --out src/goodlifetheme/icons \
	  --fill-colors "black:rgb(0,0,0)|white:rgb(255,255,255)"
	fontello-svg --config fontello-goodlife.json --no-css --verbose \
	  --out src/goodlifetheme/icons \
	  --fill-colors "black:rgb(0,0,0)|white:rgb(255,255,255)|\
	                 torch:rgb(0,41,87)|flame:rgb(241,86,63)"
	sed -i -E 's|svg height="([^"]+)" width="([^"]+)"|svg viewBox="0 0 \2 \1"|g' \
	  src/goodlifetheme/icons/*.svg
