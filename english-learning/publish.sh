#!/bin/bash
LOCAL_DIR=dist/
SERVER=root@43.136.216.240:/root/webapps/english-learing

rsync -v   --progress --stats -r -t -p -l -z -e 'ssh -p 22' --delete  $LOCAL_DIR  $SERVER