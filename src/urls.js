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

  zoneByName(name) {
    return `${this.zonesBase()}/name/${name}`;
  }

  zoneDetails(id) {
    return `${this.zone(id)}/details`;
  }

  zoneBackendIds() {
    return `${this.zonesBase()}/backendids`;
  }

  zoneChangesFailure(query) {
    return `${this.apiUrl}/metrics/health/zonechangesfailure${this.queryString(query)}`;
  }

  zonesDeletedChanges(query) {
    return `${this.zonesBase()}/deleted/changes${this.queryString(query)}`;
  }

  zoneAclRules(id) {
    return `${this.zone(id)}/acl/rules`;
  }

  syncZone(id) {
    return `${this.zone(id)}/sync`;
  }

  recordSetsBase(zoneId) {
    return `${this.zone(zoneId)}/recordsets`;
  }

  getRecordSets(zoneId, query) {
    return this.recordSetsBase(zoneId) + this.queryString(query);
  }

  recordSet(details) {
    return `${this.recordSetsBase(details.zoneId)}/${details.id || details.recordSetId}`;
  }

  recordSetCount(zoneId) {
    return `${this.zone(zoneId)}/recordsetcount`;
  }

  recordSetChangeHistory(query) {
    return `${this.apiUrl}/recordsetchange/history${this.queryString(query)}`;
  }

  recordSetChangesFailure(zoneId, query) {
    return `${this.apiUrl}/metrics/health/zones/${zoneId}/recordsetchangesfailure${this.queryString(query)}`;
  }

  recordSetChanges(zoneId, query) {
    return `${this.zone(zoneId)}/recordsetchanges${this.queryString(query)}`;
  }

  recordSetChange(details) {
    return `${this.recordSet(details)}/changes/${details.changeId}`;
  }

  batchChanges(query) {
    return `${this.zonesBase()}/batchrecordchanges${this.queryString(query)}`;
  }

  batchChange(id) {
    return `${this.batchChanges()}/${id}`;
  }

  batchChangeApprove(id) {
    return `${this.batchChange(id)}/approve`;
  }

  batchChangeReject(id) {
    return `${this.batchChange(id)}/reject`;
  }

  batchChangeCancel(id) {
    return `${this.batchChange(id)}/cancel`;
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

  getGroupActivity(id, query) {
    return `${this.group(id)}/activity${this.queryString(query)}`;
  }

  groupChange(id) {
    return `${this.groupsBase()}/change/${id}`;
  }

  groupValidDomains() {
    return `${this.groupsBase()}/valid/domains`;
  }

  getGroupAdmins(id) {
    return `${this.group(id)}/admins`;
  }

  getGroupMembers(id, query) {
    return `${this.group(id)}/members${this.queryString(query)}`;
  }

  user(id) {
    return `${this.apiUrl}/users/${id}`;
  }

  userLock(id) {
    return `${this.user(id)}/lock`;
  }

  userUnlock(id) {
    return `${this.user(id)}/unlock`;
  }

  ping() {
    return `${this.apiUrl}/ping`;
  }

  health() {
    return `${this.apiUrl}/health`;
  }

  color() {
    return `${this.apiUrl}/color`;
  }

  metricsPrometheus(names) {
    if (!names || names.length === 0) {
      return `${this.apiUrl}/metrics/prometheus`;
    }

    const query = names.map(name => `name=${name}`).join('&');
    return `${this.apiUrl}/metrics/prometheus?${query}`;
  }

  status() {
    return `${this.apiUrl}/status`;
  }

  statusUpdate(processingDisabled) {
    return `${this.apiUrl}/status?processingDisabled=${processingDisabled}`;
  }

  recordSetsGlobal(query) {
    if (!query) {
      return `${this.apiUrl}/recordsets`;
    }

    let params = [];
    if (query.recordTypeFilter) {
      const recordTypes = Array.isArray(query.recordTypeFilter)
        ? query.recordTypeFilter
        : [query.recordTypeFilter];
      recordTypes.forEach(recordType => {
        params.push(`recordTypeFilter[]=${recordType}`);
      });
    }

    Object.keys(query).forEach(key => {
      if (key === 'recordTypeFilter') {
        return;
      }
      params.push(`${key}=${query[key]}`);
    });

    return `${this.apiUrl}/recordsets${params.length ? '?' + params.join('&') : ''}`;
  }

  queryString(obj) {
    if (obj) {
      return '?' + Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
    }

    return '';
  }
}

module.exports = Urls;
