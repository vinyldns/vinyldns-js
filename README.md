[![verify](https://img.shields.io/github/workflow/status/vinyldns/vinyldns-js/verify?logo=github)](https://github.com/vinyldns/vinyldns-js/actions/workflows/verify.yml)
[![NPM](https://img.shields.io/npm/v/vinyldns-js?logo=npm)](https://www.npmjs.com/package/vinyldns-js)

# vinyldns-js

A JavaScript [VinylDNS](https://vinyldns.io) client.

[View the docs &raquo;](http://vinyldns.github.io/vinyldns-js)

## Usage

All methods return a Promise. See [the documentation](http://vinyldns.github.io/vinyldns-js) for more details.

```javascript
const VinylDNS = require('vinyldns-js');

const vinylClient = new VinylDNS({
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

```shell script
npm install
```

Create the required environment variables:

```shell script
export VINYLDNS_API_SERVER=http://my-vinyldns.com
export VINYLDNS_ACCESS_KEY_ID=123
export VINYLDNS_SECRET_ACCESS_KEY=123
```

Start the REPL:

```
npm run repl
```

Use the `vinyl` `vinyldns-js` client instance:

```javascript
> vinyl.getZones().then(res => { console.log(res) }).catch(err => { console.log(err) })
```

## Contributing

Install dependencies:

```shell script
npm install
```

Run unit tests, lint code, and build documentation microsite:

```shell script
npm test
```

Run integration tests against a Dockerized VinylDNS API running on `localhost:9000`:

```shell script
npm run integration-tests
```
