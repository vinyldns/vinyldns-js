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

const axios = require('axios');
const aws4 = require('aws4');
const url = require('url');

class Request {
  constructor(config) {
    this.config = config;
  }

  getOrDelete(url, method) {
    return this._request(this._requestOptions({
      url: url,
      method: method
    }));
  }

  createOrUpdate(resource, url, method) {
    return this._request(this._requestOptions({
      url: url,
      method: method,
      body: resource
    }));
  }

  sync(url) {
    return this._request(this._requestOptions({
      url: url,
      method: 'post'
    }));
  }

  _requestOptions(opts) {
    let parsedUrl = url.parse(opts.url);

    return {
      host: parsedUrl.host,
      url: opts.url,
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

    // axios expects a 'data'; aws4.sign expects a 'body'
    signedReq.data = opts.body;

    return new Promise((fulfill, reject) => {
      axios(signedReq)
        .then(resp => {
          fulfill(resp.data);
        })
        .catch(err => {
          reject(err);
          return;
        });
    });
  }
}

module.exports = Request;
