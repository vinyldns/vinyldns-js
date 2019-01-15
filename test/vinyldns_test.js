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

function mockPost(path, body, resp) {
  return nock(host)
    .post(path, body)
    .reply(200, resp);
}

function mockPut(path, body, resp) {
  return nock(host)
    .put(path, body)
    .reply(200, resp);
}

function mockDelete(path, resp) {
  return nock(host)
    .delete(path)
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

  describe('getZone', () => {
    it('fetches the zone with the ID it is passed', (done) => {
      mockGet('/zones/123', fixtures.getZone);

      vinyl.getZone('123')
        .then(result => {
          assert.equal(result.zone.name, 'system-test.');

          done();
        });
    });
  });

  describe('createZone', () => {
    it('creates the zone with the details it is passed', (done) => {
      let create = {
        adminGroupId: '123',
        name: 'dummy.',
        email: 'test@example.com'
      };

      mockPost('/zones', create, fixtures.createZone);

      vinyl.createZone(create)
        .then(result => {
          assert.equal(result.zone.name, 'dummy.');

          done();
        });
    });
  });

  describe('updateZone', () => {
    it('updates the zone with the details it is passed', (done) => {
      let update = {
        name: 'dummy.',
        email: 'test@example.com',
        id: '123'
      };

      mockPut('/zones/123', update, fixtures.updateZone);

      vinyl.updateZone(update)
        .then(result => {
          assert.equal(result.zone.name, 'dummy.');

          done();
        });
    });
  });

  describe('deleteZone', () => {
    it('deletes the zone with the ID it is passed', (done) => {
      mockDelete('/zones/123', fixtures.deleteZone);

      vinyl.deleteZone('123')
        .then(result => {
          assert.equal(result.zone.status, 'Deleted');

          done();
        });
    });
  });
});
