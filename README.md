# vinyldns-js

This project is a work in progress! If you would like to help us get this where it needs to be, please reach out to us in [gitter](https://gitter.im/vinyldns)

## Contributing

To set up you environment run `npm install`

`npm run  prettier` is used to keep code consistent

`npm run webpack` is used to build a minimized version of the code to be published to npm

### Work that needs to be done

* Validate standard record CRUD endpoints are created and that they work
* Create automated javascript tests, recommend using `tape` and `faucet` npm packages
* Set up travis
* Publish to NPM

## Usage

### VinylDns JavaScript package

If listed in the projects `package.json`, vinyldns-js can be used in a node environment for server-side requests to a VinylDns API

#### Example

```
const vinyldns = require('vinyldns-js');
const vinylClient = new vinyldns();

vinylClient.createGroup({
  "name": "some-group",
  "email": "test@vinyl.com",
  "description": "an example group",
  "members": [
    {
      "id": "2764183c-5e75-4ae6-8833-503cd5f4dcb0"
    }
  ],
  "admins": [
    {
      "id": "2764183c-5e75-4ae6-8833-503cd5f4dcb0"
    }
  ]
});
// returns promise
```

### VinylDns REPL

`npm run vinylrepl` will bootstrap an interactive node repl with the
`var vinylClient` already declared in scope. This is an instance of the `VinylDns`
class in `src/vinyldns.js`

This instance of the `VinylDns` class will be passed an optional repl flag, that
will cause it to print api request results to the console

#### Example

```
npm run vinylrepl
> vinylClient.listZones();
/*
  {
    "zones": [
      {
        "status": "Active",
        "account": "a0b5ea74-cc05-4932-a294-9bf935d52744",
        "name": "list-zones-test-searched-1.",
        "created": "2016-12-16T15:21:47Z",
        "adminGroupId": "a0b5ea74-cc05-4932-a294-9bf935d52744",
        "email": "test@test.com",
        "shared": false,
        "acl": {
          "rules": []
        },
        "id": "31a3d8a9-bea0-458f-9c24-3d39d4b929d6"
      },
    "maxItems": 100
  }
*/
>
>
```
