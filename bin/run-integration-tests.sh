#!/bin/bash

set -e

vinyldns_version="0.10.4"

echo "Running vinyldns-js integration tests..."

if [ ! -d ".vinyldns" ]; then \
  echo "fetching VinylDNS source code..."
  git clone https://github.com/vinyldns/vinyldns --branch "v${vinyldns_version}" .vinyldns; \
fi

.vinyldns/utils/clean-vinyldns-containers.sh

echo "Starting localhost:9000 VinylDNS API instance..."
.vinyldns/quickstart/quickstart-vinyldns.sh --api-only 

echo "Executing vinyldns-js integration tests..."

node_modules/.bin/mocha --timeout 3000 test/integration/*.js

.vinyldns/utils/clean-vinyldns-containers.sh