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

const group = {
  name: 'ok-group',
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

const zone = function(groupId) {
  return {
    adminGroupId: groupId,
    name: 'vinyldns.',
    email: 'test@example.com'
  };
};

describe('VinylDNS interaction with a real VinylDNS API', () => {
  describe('its support of VinylDNS groups', () => {
    it('can fetch all groups (when there are none)', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups.length, 0);

          done();
        });
    });

    it('can create a group', (done) => {
      vinyl.createGroup(group)
        .then(result => {
          assert.equal(result.name, 'ok-group');

          done();
        });
    });

    it('can fetch all groups (when there are groups)', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups[0].name, 'ok-group');

          done();
        });
    });

    it('can fetch group activity (when there are groups)', (done) => {
      vinyl.getGroups()
        .then(result => {
          vinyl.getGroupActivity(result.groups[0].id)
            .then(result => {
              assert.equal(result.changes[0].newGroup.name, 'ok-group');

              done();
            });
        });
    });

    it('can delete a group', (done) => {
      vinyl.getGroups()
        .then(groups => {
          vinyl.deleteGroup(groups.groups[0].id)
            .then(result => {
              assert.equal(result.status, 'Deleted');

              done();
            });
        });
    });
  });

  describe('its support of VinylDNS zones', () => {
    it('can fetch all zones (when there are none)', (done) => {
      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones.length, 0);

          done();
        });
    });

    it('can create a zone', (done) => {
      vinyl.createGroup(group)
        .then(result => {
          vinyl.createZone(zone(result.id))
            .then(result => {
              assert.equal(result.zone.name, zone().name);
              assert.equal(result.status, 'Pending');

              done();
            });
        });
    });

    it('can fetch all zones (when there are zones)', (done) => {
      // placed in a timeout such that the test runs once the zone is properly created
      // TODO: implement a more elegant solution, such as polling or a getZoneAfterCreation method
      setTimeout(() => {
        vinyl.getZones()
          .then(result => {
            assert.equal(result.zones[0].name, zone().name);

            done();
          });
      }, 1600);
    });

    it('can delete a zone', (done) => {
      vinyl.getZones()
        .then(result => {
          vinyl.deleteZone(result.zones[0].id)
            .then(result => {
              assert.equal(result.zone.status, 'Deleted');

              done();
            });
        });
    });
  });
});
