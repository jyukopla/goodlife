#!/bin/sh

vagrant ssh -c "./runbin.sh buildout -c /vagrant/buildout.cfg buildout:directory=$PWD $1 $2 $3 $4 $5 $6"
