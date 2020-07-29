#!/bin/bash

set -e

echo "Running vinyldns-js integration tests..."

if [ ! -d ".vinyldns" ]; then \
  echo "fetching VinylDNS source code..."
  git clone https://github.com/vinyldns/vinyldns .vinyldns; \
else
  echo "updating VinylDNS source code..."
  cd .vinyldns
  git pull
  cd ..
fi

.vinyldns/bin/remove-vinyl-containers.sh

echo "Starting localhost:9000 VinylDNS API instance..."
.vinyldns/bin/docker-up-vinyldns.sh \
  --api-only \
  --version 0.9.4

echo "Executing vinyldns-js integration tests..."

node_modules/.bin/mocha --timeout 3000 test/integration/*.js

.vinyldns/bin/remove-vinyl-containers.sh
