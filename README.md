# vinyldns-js

This project is a work in progress! If you would like to help us get this where it needs to be, please reach out to us in [gitter](https://gitter.im/vinyldns), open a pull request, or create an issue.

## Contributing

Install dependencies:

```
npm install
```

Run tests and lint code:

```
npm test
```

## Usage

All methods return a Promise.

```javascript
const Vinyldns = require('vinyldns-js');
const vinylClient = new Vinyldns({
  apiUrl: host,
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

## Work that needs to be done

* Create CRUD methods for all VinylDNS resources (including unit tests)
* Set up TravisCI
* Create a suite of integration/acceptance tests executed against a Dockerized VinylDNS API running on `localhost`
* Publish to NPM
* Create a REPL


