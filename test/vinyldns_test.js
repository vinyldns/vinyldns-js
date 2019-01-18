/*
 * Copyright 2019 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

function mockGet(path, resp, status) {
  status = status || 200;

  return nock(host)
    .get(path)
    .reply(status, resp);
}

function mockPost(path, body, resp, status) {
  status = status || 200;

  return nock(host)
    .post(path, body)
    .reply(status, resp);
}

function mockPut(path, body, resp, status) {
  status = status || 200;

  return nock(host)
    .put(path, body)
    .reply(status, resp);
}

function mockDelete(path, resp, status) {
  status = status || 200;

  return nock(host)
    .delete(path)
    .reply(status, resp);
}

describe('VinylDns', () => {
  it('is configurable', () => {
    assert.equal(vinyl.config.apiUrl, 'http://my-vinyldns.com');
  });

  describe('zones methods', () => {
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

      it('properly handles non-200 responses from the API', (done) => {
        mockGet('/zones', 'some err', 500);

        vinyl.getZones()
          .then(() => {
            // NOOP
          })
          .catch(resp => {
            assert.equal(resp.body, 'some err');

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

      it('properly handles non-200 responses from the API', (done) => {
        mockGet('/zones/123', 'some err', 500);

        vinyl.getZone('123')
          .then(() => {
            // NOOP
          })
          .catch(resp => {
            assert.equal(resp.body, 'some err');

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

      it('properly handles non-200 responses from the API', (done) => {
        mockPost('/zones', {}, 'some err', 500);

        vinyl.createZone({})
          .then(() => {
            // NOOP
          })
          .catch(resp => {
            assert.equal(resp.body, 'some err');

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

      it('properly handles non-200 responses from the API', (done) => {
        mockPut('/zones/123', {id: '123'}, 'some err', 500);

        vinyl.updateZone({id: '123'})
          .then(() => {
            // NOOP
          })
          .catch(resp => {
            assert.equal(resp.body, 'some err');

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

      it('properly handles non-200 responses from the API', (done) => {
        mockDelete('/zones/123', 'some err', 500);

        vinyl.deleteZone('123')
          .then(() => {
            // NOOP
          })
          .catch(resp => {
            assert.equal(resp.body, 'some err');

            done();
          });
      });
    });
  });

  describe('groups methods', () => {
    describe('getGroups', () => {
      it('fetches groups', (done) => {
        mockGet('/groups', fixtures.getGroups);

        vinyl.getGroups()
          .then(result => {
            assert.equal(result.groups[0].name, 'some-other-group');

            done();
          });
      });

      it('properly fetches groups with query params', (done) => {
        mockGet('/groups?nameFilter=foo&startFrom=1&maxItems=100', fixtures.getGroups);

        vinyl.getGroups({
          nameFilter: 'foo',
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.groups[0].name, 'some-other-group');

            done();
          });
      });
    });

    describe('getGroup', () => {
      it('fetches the group with the ID it is passed', (done) => {
        mockGet('/groups/123', fixtures.getGroup);

        vinyl.getGroup('123')
          .then(result => {
            assert.equal(result.name, 'some-group');

            done();
          });
      });
    });
  });
});
