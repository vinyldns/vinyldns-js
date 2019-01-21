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

const Request = require('./request');

class VinylDns extends Request {
  constructor(config) {
    super(config);
  }

  getZones(queryOpts) {
    return this._list(this.urls.getZones(queryOpts));
  }

  getZone(id) {
    return this._getOrDelete('zone', id, 'get');
  }

  createZone(zone) {
    return this._createOrUpdate(zone, this.urls.zonesBase(), 'post');
  }

  updateZone(zone) {
    return this._createOrUpdate(zone, this.urls.zone(zone.id), 'put');
  }

  deleteZone(id) {
    return this._getOrDelete('zone', id, 'delete');
  }

  getGroups(queryOpts) {
    return this._list(this.urls.getGroups(queryOpts));
  }

  getGroup(id) {
    return this._getOrDelete('group', id, 'get');
  }

  createGroup(group) {
    return this._createOrUpdate(group, this.urls.groupsBase(), 'post');
  }

  updateGroup(group) {
    return this._createOrUpdate(group, this.urls.group(group.id), 'put');
  }

  deleteGroup(id) {
    return this._getOrDelete('group', id, 'delete');
  }
}

module.exports = VinylDns;
