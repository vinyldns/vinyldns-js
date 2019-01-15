const assert = require('assert');
const nock = require('nock');
const fixtures = require('./fixtures/responses');
const VinylDns = require('../src/vinyldns');

const host = 'http://my-vinyldns.com';
const vinyl = new VinylDns({
  apiUrl: host,
  accessKeyId: '123',
  secretAccessKey: '123'
});

function mockGet(path, resp) {
  return nock(host)
    .get(path)
    .reply(200, resp);
}


describe('VinylDns', () => {
  it('is configurable', () => {
    assert.equal(vinyl.config.apiUrl, 'http://my-vinyldns.com');
  });

  describe('getZones', () => {
    it('fetches zones', (done) => {
      mockGet('/zones', fixtures.getZones);

      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones[0].name, 'list-zones-test-searched-1.');

          done();
        });
    });

    it('properly fetches zones with query params', (done) => {
      mockGet('/zones?nameFilter=foo&startFrom=1&maxItems=100', fixtures.getZones);

      vinyl.getZones({
        nameFilter: 'foo',
        startFrom: 1,
        maxItems: 100
      })
        .then(result => {
          assert.equal(result.zones[0].name, 'list-zones-test-searched-1.');

          done();
        });
    });
  });
});
