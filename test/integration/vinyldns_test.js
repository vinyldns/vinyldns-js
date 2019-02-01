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
const VinylDNS = require('../../src/vinyldns');

const vinyl = new VinylDNS({
  apiUrl: 'http://localhost:9000',
  accessKeyId: 'okAccessKey',
  secretAccessKey: 'okSecretKey'
});

const group = function(name) {
  return {
    name: name || 'ok-group',
    description: 'description',
    email: 'test@test.com',
    members: [{
      userName: 'ok',
      id: 'ok'
    }],
    admins: [{
      userName: 'ok',
      id: 'ok'
    }]
  };
};

const zone = function(groupId, name) {
  return {
    adminGroupId: groupId,
    name: name || 'vinyldns.',
    email: 'test@example.com'
  };
};

describe('VinylDNS interaction with a real VinylDNS API', () => {
  let testGroup;
  let testZone;

  before(() => {
    return new Promise((resolve, reject) => {
      vinyl.createGroup(group())
        .then(result => {
          testGroup = result;

          vinyl.createZone(zone(result.id))
            .then(result => {
              testZone = result;
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  });

  describe('its support of VinylDNS groups', () => {
    it('can fetch all groups', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups[0].name, 'ok-group');

          done();
        });
    });

    it('can create a group', (done) => {
      vinyl.createGroup(group('group-tests-group'))
        .then(result => {
          assert.equal(result.name, 'group-tests-group');

          done();
        });
    });

    it('can update a group', (done) => {
      vinyl.getGroups()
        .then(result => {
          let g = result.groups.find(group => group.name === 'group-tests-group');

          g.name = 'group-tests-group-updated';

          vinyl.updateGroup(g)
            .then(result => {

              assert.equal(result.name, 'group-tests-group-updated');

              done();
            });
        });
    });

    it('can fetch group activity', (done) => {
      vinyl.getGroups()
        .then(result => {
          let g = result.groups.find(group => group.name.includes('group-tests-group'));

          vinyl.getGroupActivity(g.id)
            .then(result => {
              assert.equal(result.changes[0].newGroup.name.includes('group-tests-group'), true);

              done();
            });
        });
    });

    it('can fetch group members', (done) => {
      vinyl.getGroupMembers(testGroup.id)
        .then(result => {
          assert.equal(result.members[0].userName, 'ok');

          done();
        });
    });

    it('can fetch group members', (done) => {
      vinyl.getGroupAdmins(testGroup.id)
        .then(result => {
          assert.equal(result.admins[0].userName, 'ok');

          done();
        });
    });

    it('can delete a group', (done) => {
      vinyl.getGroups()
        .then(groups => {
          vinyl.deleteGroup(groups.groups.find(g => g.name.includes('group-tests-group')).id)
            .then(result => {
              assert.equal(result.status, 'Deleted');

              done();
            });
        });
    });
  });

  describe('its support of VinylDNS zones', () => {
    it('can fetch all zones', (done) => {
      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones[0].name, testZone.zone.name);

          done();
        });
    });

    it('can create a zone', (done) => {
      vinyl.createZone(zone(testGroup.id, 'zones-tests-zone'))
        .then(result => {
          assert.equal(result.zone.name, zone().name);
          assert.equal(result.status, 'Pending');

          done();
        });
    });

    it('can delete a zone', (done) => {
      // setTimeout ensures we wait until the zone is properly created
      setTimeout(() => {
        vinyl.getZones()
          .then(result => {
            vinyl.deleteZone(result.zones.find(z => z.name === 'zones-tests-zone.').id)
              .then(result => {
                assert.equal(result.zone.status, 'Deleted');

                done();
              });
          });
      }, 2000);
    });
  });

  describe('its support of VinylDNS record sets', () => {
    it('can create a record set', (done) => {
      vinyl.createRecordSet({
        name: 'record-set-tests-create',
        type: 'A',
        ttl: 300,
        records: [{
          address: '10.10.10.10'
        }],
        zoneId: testZone.zone.id
      })
        .then(result => {
          assert.equal(result.recordSet.name, 'record-set-tests-create');

          done();
        });
    });
  });
});
