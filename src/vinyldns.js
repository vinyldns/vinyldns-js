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

const Urls = require('./urls');
const Request = require('./request');

/**
 * vinyldns-js offers an NPM module for interacting with the VinylDNS API. The VinylDNS class represents the VinylDNS API.
 * @param {object} config - The configuration object.
 * @param {string} config.apiURL - The VinylDNS API URL. Example: `https://my-vinyldns-api-instance.com`.
 * @param {string} config.accessKeyId - The VinylDNS API access key ID.
 * @param {string} config.secretAccessKey - The VinylDNS API secret access key.
 */
class VinylDNS {
  constructor(config) {
    this.config = config;
    this.urls = new Urls(config.apiUrl);
    this.request = new Request(config);
  }

  /**
   * Fetch zones.
   * @param {object} queryOpts - The zone query parameters.
   * @param {string} queryOpts.nameFilter - One or more characters contained in the name of a zone to search for.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getZones(queryOpts) {
    return this.request.getOrDelete(this.urls.getZones(queryOpts), 'get');
  }

  /**
   * Fetch zone.
   * @param {string} id - The zone ID.
   */
  getZone(id) {
    return this.request.getOrDelete(this.urls.zone(id), 'get');
  }

  /**
   * Fetch zone.
   * @param {string} name - The zone Name.
   */
  getZoneByName(name) {
    return this.request.getOrDelete(this.urls.zoneByName(name), 'get');
  }

  /**
   * Fetch zone details.
   * @param {string} id - The zone ID.
   */
  getZoneDetails(id) {
    return this.request.getOrDelete(this.urls.zoneDetails(id), 'get');
  }

  /**
   * Fetch zone backend IDs.
   */
  getZoneBackendIds() {
    return this.request.getOrDelete(this.urls.zoneBackendIds(), 'get');
  }

  /**
   * Fetch failed zone changes.
   * @param {object} queryOpts - The query parameters.
   * @param {string} queryOpts.nameFilter - Filter by zone name.
   * @param {string} queryOpts.startFrom - The start key of the page.
   * @param {number} queryOpts.maxItems - The page limit.
   */
  getZoneChangesFailure(queryOpts) {
    return this.request.getOrDelete(this.urls.zoneChangesFailure(queryOpts), 'get');
  }

  /**
   * Fetch deleted zone changes.
   * @param {object} queryOpts - The query parameters.
   * @param {string} queryOpts.nameFilter - Filter by zone name.
   * @param {string} queryOpts.startFrom - The start key of the page.
   * @param {number} queryOpts.maxItems - The page limit.
   * @param {boolean} queryOpts.ignoreAccess - Ignore access restrictions.
   */
  getZonesDeletedChanges(queryOpts) {
    return this.request.getOrDelete(this.urls.zonesDeletedChanges(queryOpts), 'get');
  }

  /**
   * Fetch zone changes.
   * @param {string} id - The zone ID.
   * @param {object} queryOpts - The zone changes query parameters.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getZoneChanges(id, queryOpts) {
    return this.request.getOrDelete(this.urls.getZoneChanges(id, queryOpts), 'get');
  }

  /**
   * Sync zone.
   * @param {string} id - The zone ID.
   */
  syncZone(id) {
    return this.request.sync(this.urls.syncZone(id));
  }

  /**
   * Create zone.
   * @param {object} zone - The VinylDNS zone to create. See the [VinylDNS zone docs]{@link https://www.vinyldns.io/api/create-zone.html} to learn more.
   */
  createZone(zone) {
    return this.request.createOrUpdate(zone, this.urls.zonesBase(), 'post');
  }

  /**
   * Update zone.
   * @param {object} zone - The VinylDNS zone to update. See the [VinylDNS zone docs]{@link https://www.vinyldns.io/api/update-zone.html} to learn more.
   */
  updateZone(zone) {
    return this.request.createOrUpdate(zone, this.urls.zone(zone.id), 'put');
  }

  /**
   * Add ACL rule to zone.
   * @param {string} zoneId - The zone ID.
   * @param {object} aclRule - The ACL rule to add.
   */
  addZoneAclRule(zoneId, aclRule) {
    return this.request.createOrUpdate(aclRule, this.urls.zoneAclRules(zoneId), 'put');
  }

  /**
   * Delete ACL rule from zone.
   * @param {string} zoneId - The zone ID.
   * @param {object} aclRule - The ACL rule to delete.
   */
  deleteZoneAclRule(zoneId, aclRule) {
    return this.request.createOrUpdate(aclRule, this.urls.zoneAclRules(zoneId), 'delete');
  }

  /**
   * Delete zone.
   * @param {string} id - The zone ID.
   */
  deleteZone(id) {
    return this.request.getOrDelete(this.urls.zone(id), 'delete');
  }

  /**
   * Fetch record sets.
   * @param {string} zoneId - The ID of the zone in which to query.
   * @param {object} queryOpts - The record sets query parameters.
   * @param {string} queryOpts.nameFilter - One or more characters contained in the name of a record set to search for.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getRecordSets(zoneId, queryOpts) {
    return this.request.getOrDelete(this.urls.getRecordSets(zoneId, queryOpts), 'get');
  }

  /**
   * Fetch record set.
   * @param {object} details - The record set details.
   * @param {string} queryOpts.nameFilter - One or more characters contained in the name of a record set to search for.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getRecordSet(details) {
    return this.request.getOrDelete(this.urls.recordSet(details), 'get');
  }

  /**
   * Create record set.
   * @param {object} recordSet - The VinylDNS record set to create. See the [VinylDNS record set docs]{@link https://www.vinyldns.io/api/recordset-model.html} to learn more.
   */
  createRecordSet(recordSet) {
    return this.request.createOrUpdate(recordSet, this.urls.recordSetsBase(recordSet.zoneId), 'post');
  }

  /**
   * Update record set.
   * @param {object} recordSet - The VinylDNS record set to update. See the [VinylDNS record set docs]{@link https://www.vinyldns.io/api/recordset-model.html} to learn more.
   */
  updateRecordSet(recordSet) {
    return this.request.createOrUpdate(recordSet, this.urls.recordSet(recordSet), 'put');
  }

  /**
   * Request record set ownership transfer.
   * @param {object} recordSet - The record set to update.
   * @param {string} requestedOwnerGroupId - The requested owner group ID.
   */
  requestRecordSetOwnership(recordSet, requestedOwnerGroupId) {
    return this._recordSetOwnershipTransfer(recordSet, 'Requested', requestedOwnerGroupId, false);
  }

  /**
   * Approve record set ownership transfer.
   * @param {object} recordSet - The record set to update.
   * @param {string} requestedOwnerGroupId - The requested owner group ID.
   */
  approveRecordSetOwnership(recordSet, requestedOwnerGroupId) {
    return this._recordSetOwnershipTransfer(recordSet, 'ManuallyApproved', requestedOwnerGroupId, true);
  }

  /**
   * Reject record set ownership transfer.
   * @param {object} recordSet - The record set to update.
   * @param {string} requestedOwnerGroupId - The requested owner group ID.
   */
  rejectRecordSetOwnership(recordSet, requestedOwnerGroupId) {
    return this._recordSetOwnershipTransfer(recordSet, 'ManuallyRejected', requestedOwnerGroupId, false);
  }

  /**
   * Cancel record set ownership transfer.
   * @param {object} recordSet - The record set to update.
   * @param {string} requestedOwnerGroupId - The requested owner group ID.
   */
  cancelRecordSetOwnership(recordSet, requestedOwnerGroupId) {
    return this._recordSetOwnershipTransfer(recordSet, 'Cancelled', requestedOwnerGroupId, false);
  }

  _recordSetOwnershipTransfer(recordSet, status, requestedOwnerGroupId, updateOwnerGroup) {
    const updated = Object.assign({}, recordSet, {
      recordSetGroupChange: {
        ownershipTransferStatus: status,
        requestedOwnerGroupId: requestedOwnerGroupId
      }
    });

    if (updateOwnerGroup) {
      updated.ownerGroupId = requestedOwnerGroupId;
    }

    return this.updateRecordSet(updated);
  }

  /**
   * Fetch record set count for a zone.
   * @param {string} zoneId - The zone ID.
   */
  getRecordSetCount(zoneId) {
    return this.request.getOrDelete(this.urls.recordSetCount(zoneId), 'get');
  }

  /**
   * Delete record set.
   * @param {object} details - The record set details.
   * @param {string} details.id - The record set ID.
   * @param {string} details.zoneId - The record set zone ID.
   */
  deleteRecordSet(details) {
    return this.request.getOrDelete(this.urls.recordSet(details), 'delete');
  }

  /**
   * Get record set change.
   * @param {object} details - The record set details.
   * @param {string} details.changeId - The record set change ID.
   * @param {string} details.recordSetId - The record set ID.
   * @param {string} details.zoneId - The record set change zone ID.
   */
  getRecordSetChange(details) {
    return this.request.getOrDelete(this.urls.recordSetChange(details), 'get');
  }

  /**
   * Fetch record set change history.
   * @param {object} queryOpts - The query parameters.
   * @param {string} queryOpts.zoneId - The zone ID.
   * @param {string} queryOpts.fqdn - The record set FQDN.
   * @param {string} queryOpts.recordType - The record set type.
   * @param {string} queryOpts.startFrom - The start key of the page.
   * @param {number} queryOpts.maxItems - The page limit.
   */
  getRecordSetChangeHistory(queryOpts) {
    return this.request.getOrDelete(this.urls.recordSetChangeHistory(queryOpts), 'get');
  }

  /**
   * Get record set change.
   * @param {string} zoneId - The zone ID.
   * @param {object} queryOpts - The request query parameters.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getRecordSetChanges(zoneId, queryOpts) {
    return this.request.getOrDelete(this.urls.recordSetChanges(zoneId, queryOpts), 'get');
  }

  /**
   * Fetch failed record set changes for a zone.
   * @param {string} zoneId - The zone ID.
   * @param {object} queryOpts - The query parameters.
   * @param {string} queryOpts.startFrom - The start key of the page.
   * @param {number} queryOpts.maxItems - The page limit.
   */
  getRecordSetChangesFailure(zoneId, queryOpts) {
    return this.request.getOrDelete(this.urls.recordSetChangesFailure(zoneId, queryOpts), 'get');
  }

  /**
   * Fetch record sets globally across zones.
   * @param {object} queryOpts - The query parameters.
   */
  getRecordSetsGlobal(queryOpts) {
    return this.request.getOrDelete(this.urls.recordSetsGlobal(queryOpts), 'get');
  }

  /**
   * Get batch changes.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getBatchChanges(queryOpts) {
    return this.request.getOrDelete(this.urls.batchChanges(queryOpts), 'get');
  }

  /**
   * Get batch change.
   * @param {string} id - The batch change ID.
   */
  getBatchChange(id) {
    return this.request.getOrDelete(this.urls.batchChange(id), 'get');
  }

  /**
   * Create batch change.
   * @param {object} batchChange - The VinylDNS batch change to create. See the [VinylDNS batch change docs]{@link https://www.vinyldns.io/api/batchchange-model.html} to learn more.
   */
  createBatchChange(batchChange) {
    return this.request.createOrUpdate(batchChange, this.urls.batchChanges(), 'post');
  }

  /**
   * Approve a batch change.
   * @param {string} id - The batch change ID.
   * @param {object} review - Optional review payload.
   */
  approveBatchChange(id, review) {
    return this.request.createOrUpdate(review || {}, this.urls.batchChangeApprove(id), 'post');
  }

  /**
   * Reject a batch change.
   * @param {string} id - The batch change ID.
   * @param {object} review - Optional review payload.
   */
  rejectBatchChange(id, review) {
    return this.request.createOrUpdate(review || {}, this.urls.batchChangeReject(id), 'post');
  }

  /**
   * Cancel a batch change.
   * @param {string} id - The batch change ID.
   * @param {object} review - Optional review payload.
   */
  cancelBatchChange(id, review) {
    return this.request.createOrUpdate(review || {}, this.urls.batchChangeCancel(id), 'post');
  }

  /**
   * Get groups.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   * @param {string} queryOpts.groupNameFilter - One or more characters contained in the name of the group set to search for.
   */
  getGroups(queryOpts) {
    return this.request.getOrDelete(this.urls.getGroups(queryOpts), 'get');
  }

  /**
   * Get a group.
   * @param {string} id - The group ID.
   */
  getGroup(id) {
    return this.request.getOrDelete(this.urls.group(id), 'get');
  }

  /**
   * Get group activity.
   * @param {string} id - The group ID.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getGroupActivity(id, queryOpts) {
    return this.request.getOrDelete(this.urls.getGroupActivity(id, queryOpts), 'get');
  }

  /**
   * Get group change by ID.
   * @param {string} id - The group change ID.
   */
  getGroupChange(id) {
    return this.request.getOrDelete(this.urls.groupChange(id), 'get');
  }

  /**
   * Get group valid domains.
   */
  getGroupValidDomains() {
    return this.request.getOrDelete(this.urls.groupValidDomains(), 'get');
  }

  /**
   * Get group admins.
   * @param {string} id - The group ID.
   */
  getGroupAdmins(id) {
    return this.request.getOrDelete(this.urls.getGroupAdmins(id), 'get');
  }

  /**
   * Get group members.
   * @param {string} id - The group ID.
   * @param {number} queryOpts.startFrom - In order to advance through pages of results, the startFrom is set to the nextId that is returned on the previous response.
   * @param {number} queryOpts.maxItems - The number of items to return in the page. Valid values are 1 - 100.
   */
  getGroupMembers(id, queryOpts) {
    return this.request.getOrDelete(this.urls.getGroupMembers(id, queryOpts), 'get');
  }

  /**
   * Get user by ID.
   * @param {string} id - The user ID.
   */
  getUser(id) {
    return this.request.getOrDelete(this.urls.user(id), 'get');
  }

  /**
   * Lock user.
   * @param {string} id - The user ID.
   */
  lockUser(id) {
    return this.request.createOrUpdate({}, this.urls.userLock(id), 'put');
  }

  /**
   * Unlock user.
   * @param {string} id - The user ID.
   */
  unlockUser(id) {
    return this.request.createOrUpdate({}, this.urls.userUnlock(id), 'put');
  }

  /**
   * Create group.
   * @param {object} group - The VinylDNS group to create. See the [VinylDNS group docs]{@link https://www.vinyldns.io/api/group-model.html} to learn more.
   */
  createGroup(group) {
    return this.request.createOrUpdate(group, this.urls.groupsBase(), 'post');
  }

  /**
   * Update group.
   * @param {object} group - The VinylDNS group to update. See the [VinylDNS group docs]{@link https://www.vinyldns.io/api/group-model.html} to learn more.
   */
  updateGroup(group) {
    return this.request.createOrUpdate(group, this.urls.group(group.id), 'put');
  }

  /**
   * Delete a group.
   * @param {string} id - The ID of the group to delete.
   */
  deleteGroup(id) {
    return this.request.getOrDelete(this.urls.group(id), 'delete');
  }

  /**
   * Ping VinylDNS.
   */
  ping() {
    return this.request.getOrDelete(this.urls.ping(), 'get');
  }

  /**
   * Health check.
   */
  health() {
    return this.request.getOrDelete(this.urls.health(), 'get');
  }

  /**
   * Color status.
   */
  color() {
    return this.request.getOrDelete(this.urls.color(), 'get');
  }

  /**
   * Prometheus metrics.
   * @param {array} names - Optional metric names.
   */
  metricsPrometheus(names) {
    return this.request.getOrDelete(this.urls.metricsPrometheus(names), 'get');
  }

  /**
   * Get system status.
   */
  getStatus() {
    return this.request.getOrDelete(this.urls.status(), 'get');
  }

  /**
   * Update system status.
   * @param {boolean} processingDisabled - Processing disabled flag.
   */
  updateStatus(processingDisabled) {
    return this.request.createOrUpdate({}, this.urls.statusUpdate(processingDisabled), 'post');
  }
}

module.exports = VinylDNS;
