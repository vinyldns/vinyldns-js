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

class FetchResources {
  static withQueryStrings(base, queryStrings) {
    let path = base;
    if (queryStrings) {
      path += '?';
      const keys = Object.keys(queryStrings);
      for (let i = 0; i < keys.length; i++) {
        path += `${keys[i]}=${queryStrings[keys[i]]}`;
        if (i < keys.length - 1) {
          path += '&';
        }
      }
    }
    return path;
  }

  static getOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/csv'
      }
    };
  }

  static postOptions(body) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-amz-target': 'Denis'
      },
      method: 'POST',
      body: JSON.stringify(body)
    };
  }

  static putOptions(body) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(body)
    };
  }

  static deleteOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'DELETE'
    };
  }
}

const routes = {
  createZone: {
    path: '/zones',
    options: body => FetchResources.postOptions(body)
  },
  updateZone: {
    path: zoneId => {
      return `/zones/${zoneId}`;
    },
    options: body => FetchResources.putOptions(body)
  },
  deleteZone: {
    path: zoneId => {
      return `/zones/${zoneId}`;
    },
    options: FetchResources.deleteOptions()
  },
  getZone: {
    path: zoneId => {
      return `/zones/${zoneId}`;
    },
    options: FetchResources.getOptions()
  },
  listZones: {
    path: queryStrings => {
      return FetchResources.withQueryStrings('/zones', queryStrings);
    },
    options: FetchResources.getOptions()
  },
  syncZone: {
    path: zoneId => {
      return `/zones/${zoneId}/sync`;
    },
    options: body => FetchResources.postOptions(body)
  },
  listZoneChanges: {
    path: (zoneId, queryStrings) => {
      return FetchResources.withQueryStrings(`/zones/${zoneId}/changes`, queryStrings);
    },
    options: FetchResources.getOptions()
  },
  createRecordSet: {
    path: zoneId => {
      return `/zones/${zoneId}/recordsets`;
    },
    options: body => FetchResources.postOptions(body)
  },
  updateRecordSet: {
    path: (zoneId, recordSetId) => {
      return `/zones/${zoneId}/recordsets/${recordSetId}`;
    },
    options: body => FetchResources.putOptions(body)
  },
  deleteRecordSet: {
    path: (zoneId, recordSetId) => {
      return `/zones/${zoneId}/recordsets/${recordSetId}`;
    },
    options: FetchResources.deleteOptions()
  },
  getRecordSet: {
    path: (zoneId, recordSetId) => {
      return `/zones/${zoneId}/recordsets/${recordSetId}`;
    },
    options: FetchResources.getOptions()
  },
  listRecordSets: {
    path: (zoneId, queryStrings) => {
      return FetchResources.withQueryStrings(`/zones/${zoneId}/recordsets`, queryStrings);
    },
    options: FetchResources.getOptions()
  },
  listRecordSetChanges: {
    path: (zoneId, queryStrings) => {
      return FetchResources.withQueryStrings(`/zones/${zoneId}/recordsetchanges`, queryStrings);
    },
    options: FetchResources.getOptions()
  },
  createGroup: {
    path: '/groups',
    options: body => FetchResources.postOptions(body)
  },
  updateGroup: {
    path: groupId => {
      return `/groups/${groupId}`;
    },
    options: body => FetchResources.putOptions(body)
  },
  deleteGroup: {
    path: groupId => {
      return `/groups/${groupId}`;
    },
    options: FetchResources.deleteOptions()
  },
  listGroups: {
    path: queryStrings => {
      return FetchResources.withQueryStrings('/groups', queryStrings);
    },
    options: FetchResources.getOptions()
  },
  getGroup: {
    path: groupId => {
      return `/groups/${groupId}`;
    },
    options: FetchResources.getOptions()
  },
  createBatchChange: {
    path: '/zones/batchrecordchanges',
    options: body => FetchResources.postOptions(body)
  },
  getBatchChange: {
    path: batchId => {
      return `/zones/batchrecordchanges/${batchId}`;
    },
    options: FetchResources.getOptions()
  },
  listBatchChanges: {
    path: queryStrings => {
      return FetchResources.withQueryStrings('/zones/batchrecordchanges', queryStrings);
    },
    options: FetchResources.getOptions()
  }
};

export default FetchResources;
export {routes};
