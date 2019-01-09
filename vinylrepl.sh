#!/usr/bin/env bash

DIR=$( cd $(dirname $0) ; pwd -P )
node -i -e "var vinyl = require('$DIR/build/vinyldns.bundle.js'); \
            var vinylClient = new vinyl.VinylDns(true);"
