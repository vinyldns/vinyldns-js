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
    return this.request(this.requestOptions({
      url: this.urls.getZones(queryOpts)
    }));
  }

  getZone(id) {
    return this.request(this.requestOptions({
      url: this.urls.zone(id)
    }));
  }

  createZone(zone) {
    return this.request(this.requestOptions({
      url: this.urls.zonesBase(),
      body: zone,
      method: 'post'
    }));
  }

  updateZone(zone) {
    return this.request(this.requestOptions({
      url: this.urls.zone(zone.id),
      body: zone,
      method: 'put'
    }));
  }

  deleteZone(id) {
    return this.request(this.requestOptions({
      url: this.urls.zone(id),
      method: 'delete'
    }));
  }

  getGroups(queryOpts) {
    return this.request(this.requestOptions({
      url: this.urls.getGroups(queryOpts)
    }));
  }

  getGroup(id) {
    return this.request(this.requestOptions({
      url: this.urls.group(id)
    }));
  }

  createGroup(group) {
    return this.request(this.requestOptions({
      url: this.urls.groupsBase(),
      body: group,
      method: 'post'
    }));
  }

  requestOptions(opts) {
    return {
      service: 'vinyldns',
      region: 'us-east-1',
      host: url.parse(opts.url).host,
      url: opts.url,
      method: opts.method || 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      body: opts.body ? JSON.stringify(opts.body) : ''
    };
  }

  request(opts) {
    let signedReq = aws4.sign(opts, {
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey
    });

    return new Promise((fulfill, reject) => {
      request(signedReq, (err, resp) => {
        if (err) reject(err);

        fulfill(JSON.parse(resp.body));
      });
    });
  }
}

module.exports = VinylDns;
