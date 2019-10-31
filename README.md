[![Build Status](https://travis-ci.org/vinyldns/vinyldns-js.svg?branch=master)](https://travis-ci.org/vinyldns/vinyldns-js)
![GitHub](https://img.shields.io/github/license/vinyldns/vinyldns-js)

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

## Contributing

Install dependencies:

```
npm install
```

Run unit tests, lint code, and build documentation microsite:

```
npm test
```

Run integration tests against a Dockerized VinylDNS API running on `localhost:9000`:

```
npm run integration-tests
```

## Releasing

[TravisCI](https://travis-ci.org/vinyldns/vinyldns-js) performs an `npm release` on each creation of a `git` tag. TravisCI also publishes docs to [GitHub Pages](https://docs.travis-ci.com/user/deployment/pages/) at [vinyldns.github.io/vinyldns-js](https://vinyldns.github.io/vinyldns-js).

`npm run tag` offers a convenience task for performing a release.
