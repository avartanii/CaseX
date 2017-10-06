#!/bin/bash

# https://gist.githubusercontent.com/m-szk/1306735/raw/6d3df5418f4161b4d858200ac962f9eab15ab761/mongod.sh
# echo `ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' '`
grep_mongo=`ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' '`
# echo $grep_mongo
if [ $grep_mongo -gt 0 ]
  then echo "MongoDB is already running."
  else echo "Start MongoDB."
	`mongod`
  # RETVAL=$?
fi
