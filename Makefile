all: build

build: buildout.cfg
	vagrant up
	./buildout.sh

watch: build
	make -C resources watch

serve: build
	./plonectl.sh fg

clean:
	vagrant halt -f
	make -C resources clean
	rm -f kill_plone.sh plonectl.sh buildout.sh vagrant_scp.sh
	rm -rf plone

###

.PHONY: all build watch serve clean
