[![Build Status](https://travis-ci.org/vinyldns/vinyldns-js.svg?branch=master)](https://travis-ci.org/vinyldns/vinyldns-js)

# vinyldns-js

This project is a work in progress! If you would like to help us get this where it needs to be, please reach out to us in [gitter](https://gitter.im/vinyldns), open a pull request, or create an issue.

## Contributing

Install dependencies:

```
npm install
```

Run unit tests and lint code:

```
npm test
```

Run integration tests against a Dockerized VinylDNS API running on `localhost:9000`:

```
npm run integration-tests
```

## Usage

All methods return a Promise.

```javascript
const Vinyldns = require('vinyldns-js');
const vinylClient = new Vinyldns({
  apiUrl: 'http://my-vinyldns.com',
  accessKeyId: '123',
  secretAccessKey: '123'
});

vinylClient.createZone({
  adminGroupId: '123',
  name: 'dummy.',
  email: 'test@example.com'
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

vinylClient.getZone('123')
.then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});
```

### REPL

`vinyldns-js` ships with a built in REPL. To use the REPL...

Install dependencies:

```
npm install
```

Create the required environment variables:

```
export VINYLDNS_API_SERVER=http://my-vinyldns.com
export VINYLDNS_ACCESS_KEY_ID=123
export VINYLDNS_SECRET_ACCESS_KEY=123
```

Start the REPL:

```
npm run repl
```

Use the `vinyl` `vinyldns-js` client instance:

```
> vinyl.getZones().then(res => { console.log(res) }).catch(err => { console.log(err) })
```

## Work that needs to be done

* Create CRUD methods for all VinylDNS resources (including unit tests)
* Publish to NPM
