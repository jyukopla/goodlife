all: build

build: .vagrant buildout.cfg
	./buildout.sh

watch: build
	make -C resources watch

serve: build
	./plonectl.sh fg

clean:
	vagrant destroy -f
	make -C resources clean
	rm -f kill_plone.sh plonectl.sh buildout.sh vagrant_scp.sh
	rm -rf .vagrant plone

###

.PHONY: all build watch clean

.vagrant:
	vagrant up

resources/theme/webpack:
	make -C resources
