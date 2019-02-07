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
const VinylDNS = require('../src/vinyldns');

const host = 'http://my-vinyldns.com';
const vinyl = new VinylDNS({
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

describe('VinylDNS', () => {
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

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones', 'some err', 500);

        vinyl.getZones()
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123', 'some err', 500);

        vinyl.getZone('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('syncZone', () => {
      it('syncs the zone with the ID it is passed', (done) => {
        mockPost('/zones/123/sync', '', fixtures.syncZone);

        vinyl.syncZone('123')
          .then(result => {
            assert.equal(result.zone.name, 'sync-test.');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockPost('/zones/123/sync', '', 'some err', 500);

        vinyl.syncZone('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getZoneChanges', () => {
      it('fetches zone changes', (done) => {
        mockGet('/zones/123/changes', fixtures.getZoneChanges);

        vinyl.getZoneChanges('123')
          .then(result => {
            assert.equal(result.zoneChanges[0].zone.name, 'system-test-history.');

            done();
          });
      });

      it('properly fetches zone changes with query params', (done) => {
        mockGet('/zones/123/changes?startFrom=1&maxItems=100', fixtures.getZoneChanges);

        vinyl.getZoneChanges('123', {
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.zoneChanges[0].zone.name, 'system-test-history.');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123/changes', 'some err', 500);

        vinyl.getZoneChanges('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockPost('/zones', {}, 'some err', 500);

        vinyl.createZone({})
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockPut('/zones/123', {id: '123'}, 'some err', 500);

        vinyl.updateZone({id: '123'})
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockDelete('/zones/123', 'some err', 500);

        vinyl.deleteZone('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });
  });

  describe('record sets methods', () => {
    describe('getRecordSets', () => {
      it('fetches record sets for the zone whose ID it is passed', (done) => {
        mockGet('/zones/123/recordsets', fixtures.getRecordSets);

        vinyl.getRecordSets('123')
          .then(result => {
            assert.equal(result.recordSets[0].name, 'some-record-set');

            done();
          });
      });

      it('properly fetches record sets with query params', (done) => {
        mockGet('/zones/123/recordsets?nameFilter=foo&startFrom=1&maxItems=100', fixtures.getRecordSets);

        vinyl.getRecordSets('123', {
          nameFilter: 'foo',
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.recordSets[0].name, 'some-record-set');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123/recordsets', 'some err', 500);

        vinyl.getRecordSets('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getRecordSet', () => {
      it('fetches the record set with the ID and zone ID it is passed', (done) => {
        mockGet('/zones/123/recordsets/456', fixtures.getRecordSet);

        vinyl.getRecordSet({
          id: '456',
          zoneId: '123'
        })
          .then(result => {
            assert.equal(result.name, 'some-record-set');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123/recordsets/456', 'some err', 500);

        vinyl.getRecordSet({
          zoneId: '123',
          id: '456'
        })
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('createRecordSet', () => {
      it('creates the record with the details it is passed', (done) => {
        let recordSet = {
          name: 'foo',
          type: 'A',
          ttl: 300,
          records: [{
            address: '10.10.10.10'
          }],
          zoneId: '123'
        };

        mockPost('/zones/123/recordsets', recordSet, fixtures.createRecordSet);

        vinyl.createRecordSet(recordSet)
          .then(result => {
            assert.equal(result.recordSet.name, 'foo');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        let recordSet = {
          name: 'foo',
          type: 'A',
          ttl: 300,
          records: [{
            address: '10.10.10.10'
          }],
          zoneId: '123'
        };

        mockPost('/zones/123/recordsets', recordSet, 'some err', 500);

        vinyl.createRecordSet(recordSet)
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('updateRecordSet', () => {
      it('updates the record with the details it is passed', (done) => {
        let recordSet = {
          name: 'foo',
          type: 'A',
          ttl: 300,
          records: [{
            address: '10.10.10.10'
          }],
          zoneId: '123',
          id: '456'
        };

        mockPut('/zones/123/recordsets/456', recordSet, fixtures.updateRecordSet);

        vinyl.updateRecordSet(recordSet)
          .then(result => {
            assert.equal(result.recordSet.name, 'foo');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        let recordSet = {
          name: 'foo',
          type: 'A',
          ttl: 300,
          records: [{
            address: '10.10.10.10'
          }],
          zoneId: '123',
          id: '456'
        };

        mockPut('/zones/123/recordsets/456', recordSet, 'some err', 500);

        vinyl.updateRecordSet(recordSet)
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('deleteRecordSet', () => {
      it('deletes the record with the details it is passed', (done) => {
        mockDelete('/zones/123/recordsets/456', fixtures.deleteRecordSet);

        vinyl.deleteRecordSet({
          zoneId: '123',
          id: '456'
        })
          .then(result => {
            assert.equal(result.changeType, 'Delete');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockDelete('/zones/123/recordsets/456', 'some err', 500);

        vinyl.deleteRecordSet({
          zoneId: '123',
          id: '456'
        })
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getRecordSetChanges', () => {
      it('fetches the record set changes with the record set ID and zone ID details it is passed', (done) => {
        mockGet('/zones/123/recordsetchanges', fixtures.getRecordSetChanges);

        vinyl.getRecordSetChanges('123')
          .then(result => {
            assert.equal(result.recordSetChanges[0].status, 'Complete');

            done();
          });
      });

      it('properly fetches record set changes with query params', (done) => {
        mockGet('/zones/123/recordsetchanges?startFrom=1&maxItems=100', fixtures.getRecordSetChanges);

        vinyl.getRecordSetChanges('123', {
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.recordSetChanges[0].status, 'Complete');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123/recordsetchanges', 'some err', 500);

        vinyl.getRecordSetChanges('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getRecordSetChange', () => {
      it('fetches the record set change with the change ID, record set ID, and zone ID details it is passed', (done) => {
        mockGet('/zones/123/recordsets/456/changes/789', fixtures.getRecordSetChange);

        vinyl.getRecordSetChange({
          changeId: '789',
          recordSetId: '456',
          zoneId: '123'
        })
          .then(result => {
            assert.equal(result.recordSet.name, 'foo');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/zones/123/recordsets/456/changes/789', 'some err', 500);

        vinyl.getRecordSetChange({
          changeId: '789',
          recordSetId: '456',
          zoneId: '123'
        })
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/groups', 'some err', 500);

        vinyl.getGroups()
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

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

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/groups/123', 'some err', 500);

        vinyl.getGroup('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getGroupActivity', () => {
      it('fetches activity for the group with the ID it is passed', (done) => {
        mockGet('/groups/123/activity', fixtures.getGroupActivity);

        vinyl.getGroupActivity('123')
          .then(result => {
            assert.equal(result.changes[0].changeType, 'Update');

            done();
          });
      });

      it('properly fetches group activity with query params', (done) => {
        mockGet('/groups/123/activity?startFrom=1&maxItems=100', fixtures.getGroupActivity);

        vinyl.getGroupActivity('123', {
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.changes[0].changeType, 'Update');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/groups/123/activity', 'some err', 500);

        vinyl.getGroupActivity('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getGroupAdmins', () => {
      it('fetches the admins of the group ID it is passed', (done) => {
        mockGet('/groups/123/admins', fixtures.getGroupAdmins);

        vinyl.getGroupAdmins('123')
          .then(result => {
            assert.equal(result.admins[0].userName, 'jdoe201');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/groups/123/admins', 'some err', 500);

        vinyl.getGroupAdmins('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('getGroupMembers', () => {
      it('fetches the members of the group ID it is passed', (done) => {
        mockGet('/groups/123/members', fixtures.getGroupMembers);

        vinyl.getGroupMembers('123')
          .then(result => {
            assert.equal(result.members[0].userName, 'jdoe201');

            done();
          });
      });

      it('properly fetches group members with query params', (done) => {
        mockGet('/groups/123/members?startFrom=1&maxItems=100', fixtures.getGroupMembers);

        vinyl.getGroupMembers('123', {
          startFrom: 1,
          maxItems: 100
        })
          .then(result => {
            assert.equal(result.members[0].userName, 'jdoe201');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockGet('/groups/123/members', 'some err', 500);

        vinyl.getGroupMembers('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('createGroup', () => {
      it('creates the group with the details it is passed', (done) => {
        let create = {
          name: 'some-group',
          email: 'test@example.com',
          description: 'an example group',
          members: [{
            id: '123'
          }],
          admins: [{
            id: '456'
          }]
        };

        mockPost('/groups', create, fixtures.createGroup);

        vinyl.createGroup(create)
          .then(result => {
            assert.equal(result.name, 'some-group');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        let create = {
          name: 'some-group',
          email: 'test@example.com',
          description: 'an example group',
          members: [{
            id: '123'
          }],
          admins: [{
            id: '456'
          }]
        };

        mockPost('/groups', create, 'some err', 500);

        vinyl.createGroup(create)
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('updateGroup', () => {
      it('updates the group with the details it is passed', (done) => {
        let update = {
          name: 'some-group',
          id: '123',
          email: 'test@example.com',
          description: 'an example group',
          members: [{
            id: '123'
          }],
          admins: [{
            id: '456'
          }]
        };

        mockPut('/groups/123', update, fixtures.updateGroup);

        vinyl.updateGroup(update)
          .then(result => {
            assert.equal(result.name, 'some-group');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        let update = {
          name: 'some-group',
          id: '123',
          email: 'test@example.com',
          description: 'an example group',
          members: [{
            id: '123'
          }],
          admins: [{
            id: '456'
          }]
        };

        mockPut('/groups/123', update, 'some err', 500);

        vinyl.updateGroup(update)
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });

    describe('deleteGroup', () => {
      it('deletes the group with the ID it is passed', (done) => {
        mockDelete('/groups/123', fixtures.deleteGroup);

        vinyl.deleteGroup('123')
          .then(result => {
            assert.equal(result.status, 'Deleted');

            done();
          });
      });

      it('properly handles not okay responses from the API', (done) => {
        mockDelete('/groups/123', 'some err', 500);

        vinyl.deleteGroup('123')
          .then(() => {
            // NOOP
          })
          .catch(err => {
            assert.equal(err.message, '500: some err');

            done();
          });
      });
    });
  });
});
