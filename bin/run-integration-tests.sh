#!/bin/bash

set -e

VINYLDNS_VERSION="0.10.4"

echo "Removing VinylDNS API if exists.."
if docker ps | grep -q "vinyldns-js-api"; then
	 docker kill vinyldns-js-api &> /dev/null || true
	 docker rm vinyldns-js-api &> /dev/null || true
   echo "Removed VinylDNS API"
else echo "VinylDNS API does not exists"
fi

echo "Running vinyldns-js integration tests..."

echo "Starting VinylDNS API.."
docker run -d --name vinyldns-js-api -p "9000:9000" -p "19001:19001" -e RUN_SERVICES="all tail-logs" vinyldns/build:base-test-integration-v$VINYLDNS_VERSION

echo "Waiting for VinylDNS API to start.."
{ timeout "20s" grep -q 'STARTED SUCCESSFULLY' <(timeout 20s docker logs -f vinyldns-js-api);	echo "VinylDNS API STARTED SUCCESSFULLY";  } || { echo "VinylDNS API failed to start"; exit 1; }

echo "Executing vinyldns-js integration tests..."
npm install && node_modules/.bin/mocha --timeout 3000 test/integration/*.js

echo "Removing VinylDNS API.."

if docker ps | grep -q "vinyldns-js-api"; then
	 docker kill vinyldns-js-api &> /dev/null || true
	 docker rm vinyldns-js-api &> /dev/null || true
   echo "Removed VinylDNS API"
else echo "VinylDNS API does not exists"
fi
