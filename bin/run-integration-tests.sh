#!/bin/bash

if [ ! -d ".vinyldns" ]; then \
  echo "fetching VinylDNS source code..."; \
  git clone https://github.com/vinyldns/vinyldns .vinyldns; \
fi

.vinyldns/bin/docker-up-vinyldns.sh \
  --api-only \
  --version 0.8.0

node_modules/.bin/mocha test/integration/*.js

.vinyldns/bin/remove-vinyl-containers.sh
