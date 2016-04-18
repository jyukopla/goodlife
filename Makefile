all: build

build: .vagrant buildout.cfg
	./buildout.sh

watch: build
	node_modules/.bin/concurrently --kill-others \
		"make -C resources watch" \
		"./plonectl.sh fg"

clean:
	vagrant destroy -f
	make -C resources clean
	rm -f kill_plone.sh plonectl.sh buildout.sh vagrant_scp.sh
	rm -rf .vagrant plone

###

.PHONY: all build watch clean

.vagrant: resources/theme/webpack
	vagrant up

resources/theme/webpack:
	make -C resources

node_modules: package.json
	npm install
	touch node_modules
