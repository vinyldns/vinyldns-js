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

const request = require('request');
const aws4 = require('aws4');
const url = require('url');
const Urls = require('./urls');

class VinylDns {
  constructor(config) {
    this.config = config;
    this.urls = new Urls(config.apiUrl);
  }

  getZones(queryOpts) {
    return this._list(this.urls.getZones(queryOpts));
  }

  getZone(id) {
    return this._getOrDelete('zone', id, 'get');
  }

  getZoneChanges(id, queryOpts) {
    return this._list(this.urls.getZoneChanges(id, queryOpts));
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

  _requestOptions(opts) {
    let parsedUrl = url.parse(opts.url);

    return {
      host: parsedUrl.host,
      uri: opts.url,
      method: opts.method ? opts.method.toUpperCase() : 'GET',
      path: parsedUrl.path,
      headers: {
        'Content-Type': 'application/json'
      },
      body: opts.body ? JSON.stringify(opts.body) : ''
    };
  }

  _request(opts) {
    let signedReq = aws4.sign(opts, {
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey
    });

    return new Promise((fulfill, reject) => {
      request(signedReq, (err, resp) => {
        if (err) {
          reject(err);
          return;
        }

        if (resp.statusCode !== 200) {
          reject(new Error(`${resp.statusCode}: ${resp.body}`));
          return;
        }

        fulfill(JSON.parse(resp.body));
      });
    });
  }

  _list(url) {
    return this._request(this._requestOptions({
      url: url
    }));
  }

  _getOrDelete(resourceType, id, method) {
    return this._request(this._requestOptions({
      url: this.urls[resourceType](id),
      method: method
    }));
  }

  _createOrUpdate(resource, url, method) {
    return this._request(this._requestOptions({
      url: url,
      method: method,
      body: resource
    }));
  }
}

module.exports = VinylDns;
