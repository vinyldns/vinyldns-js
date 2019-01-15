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
const Urls = require('./urls');

class VinylDns {
  constructor(config) {
    this.config = config;
    this.urls = new Urls(config.apiUrl);
  }

  requestOptions(opts) {
    return {
      url: opts.url,
      method: opts.method || 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  request(opts) {
    opts.service = 'vinyldns';
    opts.region = 'us-east-1';
    opts.host = 'my-vinyldns.com';

    return new Promise((fulfill, reject) => {
      request(aws4.sign(opts, {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      }), (err, resp) => {
        if (err) reject(err);

        fulfill(JSON.parse(resp.body));
      });
    });
  }

  getZones() {
    return this.request(this.requestOptions({
      url: this.urls.zones()
    }));
  }
}

module.exports = VinylDns;
