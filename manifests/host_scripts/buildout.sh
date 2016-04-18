#!/bin/sh

vagrant ssh -c "./runbin.sh buildout -Nc /vagrant/buildout.cfg buildout:directory=/home/vagrant/Plone/zinstance $1 $2 $3 $4 $5 $6"
