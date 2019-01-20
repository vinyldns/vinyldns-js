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
const VinylDns = require('../../src/vinyldns');

const vinyl = new VinylDns({
  apiUrl: 'http://localhost:9000',
  accessKeyId: 'okAccessKey',
  secretAccessKey: 'okSecretKey'
});

function group() {
  return {
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
}

function zone(groupId) {
  return {
    adminGroupId: groupId,
    name: 'test-zone.',
    email: 'test@example.com'
  };
}

describe('VinylDns integration tests', () => {
  describe('groups', () => {
    it('fetches all groups (when there are none)', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups.length, 0);

          done();
        });
    });

    it('creates groups', (done) => {
      vinyl.createGroup(group())
        .then(result => {
          assert.equal(result.name, 'ok-group');

          done();
        });
    });

    it('fetches all groups (when there are groups)', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups[0].name, 'ok-group');

          done();
        });
    });

    it('deletes groups', (done) => {
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

  describe('zones', () => {
    it('fetches all zones (when there are none)', (done) => {
      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones.length, 0);

          done();
        });
    });

    it('creates zones', (done) => {
      vinyl.createGroup(group())
        .then(result => {
          vinyl.createZone(zone(result.id))
            .then(result => {
              assert.equal(result.zones[0].name, zone().name);

              done();
        });
      });
    });

    it('fetches all zones (when there are zones)', (done) => {
      vinyl.getZones()
        .then(result => {
          assert.equal(result.zones[0].name, zone().name);

          done();
        });
    });

    it('deletes zones', (done) => {
      vinyl.deleteZone(zone().id)
        .then(result => {
          assert.equal(result.zone.status, 'Deleted');

          done();
        });
    });
  });
});
