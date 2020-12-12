#!/bin/bash

set -e

vinyldns_version="0.9.7"

echo "Running vinyldns-js integration tests..."

if [ ! -d ".vinyldns" ]; then \
  echo "fetching VinylDNS source code..."
  git clone https://github.com/vinyldns/vinyldns --branch "v${vinyldns_version}" .vinyldns; \
fi

.vinyldns/bin/remove-vinyl-containers.sh

echo "Starting localhost:9000 VinylDNS API instance..."
.vinyldns/bin/docker-up-vinyldns.sh \
  --api-only \
  --version "${vinyldns_version}"

echo "Executing vinyldns-js integration tests..."

node_modules/.bin/mocha --timeout 3000 test/integration/*.js

.vinyldns/bin/remove-vinyl-containers.sh
