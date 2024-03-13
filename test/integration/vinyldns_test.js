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

const buildGroup = function(name) {
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

const buildZone = function(groupId, name) {
  return {
    adminGroupId: groupId,
    name: name || 'vinyldns.',
    email: 'test@example.com'
  };
};

describe('VinylDNS interaction with a real VinylDNS API', () => {
  let testGroup;
  let testZone;

  describe('its support of VinylDNS group creation', () => {
    it('can create groups', () => {
      vinyl.createGroup(buildGroup())
        .then(result => {
          // save the result in the `testGroup` variable for other tests to use
          testGroup = result;

          assert.equal(result.name, 'ok-group');
        });
    });
  });

  describe('its support of VinylDNS group fetching', () => {
    it('can fetch all groups', () => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups[0].name, 'ok-group');

        });
    });

    it('can fetch an individual group', () => {
      vinyl.getGroup(testGroup.id)
        .then(result => {
          assert.equal(result.name, 'ok-group');

        });
    });
  });

  describe('its support of VinylDNS group membership', () => {
    it('can fetch group members', () => {
      vinyl.getGroupMembers(testGroup.id)
        .then(result => {
          assert.equal(result.members[0].userName, 'ok');

        });
    });

    it('can fetch group admins', () => {
      vinyl.getGroupAdmins(testGroup.id)
        .then(result => {
          assert.equal(result.admins[0].userName, 'ok');

        });
    });
  });

  describe('its support of VinylDNS zone creation', () => {
    it('can create a zone', () => {
      vinyl.createZone(buildZone(testGroup.id))
        .then(result => {
          // Save the result as `testZone` for other tests to use
          testZone = result;

          // Pause to allow the zone to propagate before proceeding to other tests, where the zone is used
          setTimeout(() => {
            assert.equal(result.zone.name, 'vinyldns.');

          }, 2000);
        });
    });
  });

  describe('its support of VinylDNS zone fetching', () => {
    it('can fetch all zones', () => {
      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones[0].name, testZone.zone.name);

        });
    });

    it('can fetch individual zones by ID', () => {
      vinyl.getZone(testZone.zone.id)
        .then(result => {
          assert.equal(result.zone.name, testZone.zone.name);

        });
    });

    it('can fetch individual zones by Name', () => {
      vinyl.getZoneByName(testZone.zone.name)
        .then(result => {
          assert.equal(result.zone.name, testZone.zone.name);

        });
    });
  });

  describe('its support of VinylDNS record sets', () => {
    it('can create a record set', () => {
      vinyl.createRecordSet({
        name: 'record-set-tests-create',
        type: 'A',
        ttl: 300,
        records: [{
          address: '10.10.10.10'
        }],
        zoneId: testZone.zone.id,
        ownerGroupId: testGroup.id
      })
        .then(result => {
          assert.equal(result.recordSet.name, 'record-set-tests-create');
          assert.equal(result.recordSet.ownerGroupId, testGroup.id);
        });
    });
  });

  describe('its support of VinylDNS group updating', () => {
    it('can update a group', () => {
      let g = testGroup;

      g.name = 'group-tests-group-updated';

      vinyl.updateGroup(g)
        .then(result => {

          assert.equal(result.name, 'group-tests-group-updated');

        });
    });
  });

  describe('its support of fetching VinylDNS group activity', () => {
    it('can fetch group activity', () => {
      vinyl.getGroupActivity(testGroup.id)
        .then(result => {
          assert.equal(result.changes[0].newGroup.name.includes('group-tests-group'), true);

        });
    });
  });

  describe('its support of deleting VinylDNS groups', () => {
    it('will report an error if it attempts to delete an admin group', () => {
      vinyl.deleteGroup(testGroup.id)
        .catch(err => {
          assert.equal(err.message, 'Request failed with status code 400');

        });
    });
  });

  describe('its support of VinylDNS batch changes', () => {
    it('can create a batch change', () => {

      let batch = {
        comments: 'this is optional',
        ownerGroupId: testGroup.id,
        changes: [
          {
            inputName: `testadd.${testZone.zone.name}`,
            changeType: 'Add',
            type: 'A',
            ttl: 3600,
            record: {
              address: '1.1.1.1'
            }
          }
        ]
      };

      vinyl.createBatchChange(batch)
        .then(result => {
          assert.equal(result.changes[0].recordName, 'testadd');
          assert.equal(result.ownerGroupId, testGroup.id);
        });
    });
  });

  describe('its support of VinylDNS zone deletion', () => {
    it('can delete a zone', () => {
      vinyl.deleteZone(testZone.zone.id)
        .then(result => {
          assert.equal(result.zone.status, 'Deleted');

        });
    });
  });
});
