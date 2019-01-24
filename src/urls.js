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

class Urls {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  zonesBase() {
    return `${this.apiUrl}/zones`;
  }

  getZones(query) {
    return this.zonesBase() + this.queryString(query);
  }

  getZoneChanges(id, query) {
    return `${this.zone(id)}/changes${this.queryString(query)}`;
  }

  zone(id) {
    return `${this.zonesBase()}/${id}`;
  }

  syncZone(id) {
    return `${this.zone(id)}/sync`;
  }

  groupsBase() {
    return `${this.apiUrl}/groups`;
  }

  getGroups(query) {
    return this.groupsBase() + this.queryString(query);
  }

  group(id) {
    return `${this.groupsBase()}/${id}`;
  }

  getGroupAdmins(id) {
    return `${this.groupsBase()}/${id}/admins`;
  }

  getGroupMembers(id) {
    return `${this.groupsBase()}/${id}/members`;
  }

  queryString(obj) {
    if (obj) {
      return '?' + Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
    }

    return '';
  }
}

module.exports = Urls;
