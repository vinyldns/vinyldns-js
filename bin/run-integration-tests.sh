#!/bin/bash

set -e

echo "Running vinyldns-js integration tests..."

if [ ! -d ".vinyldns" ]; then \
  echo "fetching VinylDNS source code..."
  git clone https://github.com/vinyldns/vinyldns .vinyldns; \
fi

echo "Starting localhost:9000 VinylDNS API instance..."
.vinyldns/bin/docker-up-vinyldns.sh \
  --api-only \
  --version 0.8.0

echo "Executing vinyldns-js integration tests..."

node_modules/.bin/mocha test/integration/*.js

.vinyldns/bin/remove-vinyl-containers.sh
