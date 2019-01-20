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

describe('VinylDns integration tests', () => {
  describe('groups', () => {
    it('fetches groups (when there are none)', (done) => {
      vinyl.getGroups()
        .then(result => {
          assert.equal(result.groups.length, 0);

          done();
        });
    });

    it('creates groups', (done) => {
      vinyl.createGroup({
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
      })
        .then(result => {
          assert.equal(result.name, 'ok-group');

          done();
        });
    });

    it('fetches groups (when there are groups)', (done) => {
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
});
