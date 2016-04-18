#!/bin/sh

vagrant ssh -c "./runbin.sh buildout -c /vagrant/buildout.cfg $1 $2 $3 $4 $5 $6"
