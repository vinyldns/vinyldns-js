SHELL=bash
VINYLDNS_VERSION=0.10.4

# Check that the required version of make is being used
REQ_MAKE_VER:=3.82
ifneq ($(REQ_MAKE_VER),$(firstword $(sort $(MAKE_VERSION) $(REQ_MAKE_VER))))
   $(error The version of MAKE $(REQ_MAKE_VER) or higher is required; you are running $(MAKE_VERSION))
endif

.ONESHELL:

all: start-api test stop-api


.PHONY: start-api
start-api: stop-api
	@set -euo pipefail
	echo "Starting VinylDNS API.."
	docker run -d --name vinyldns-js-api -p "9000:9000" -p "19001:19001" -e RUN_SERVICES="all tail-logs" vinyldns/build:base-test-integration-v$(VINYLDNS_VERSION)
	echo "Waiting for VinylDNS API to start.."
	{ timeout "20s" grep -q 'STARTED SUCCESSFULLY' <(timeout 20s docker logs -f vinyldns-js-api) ;	echo "VinylDNS API STARTED SUCCESSFULLY";  } || { echo "VinylDNS API failed to start"; exit 1; }

.PHONY: stop-api
stop-api:
	@set -euo pipefail
	if docker ps | grep -q "vinyldns-js-api"; then
		docker kill vinyldns-js-api &> /dev/null || true
		docker rm vinyldns-js-api &> /dev/null || true   
	fi

.PHONY: test
test: start-api execute-tests stop-api

.PHONY: execute-tests
execute-tests: integration-tests tests

.PHONY: integration-tests
integration-tests:
	set -euo pipefail
	echo "Executing vinyldns-js integration tests..."
	npm install && node_modules/.bin/mocha --timeout 3000 test/integration/*.js

.PHONY: tests
tests:
	set -euo pipefail
	echo "Executing vinyldns-js tests..."
	npm install && npx mocha && npx eslint src/*.js test/**/*.js && npm run generate-docs