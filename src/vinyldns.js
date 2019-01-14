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

import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';

import FetchResources, {routes} from './FetchResources';

export default class VinylDns {
  constructor(repl) {
    if (repl && repl === true) {
      this.repl = true;
    } else {
      this.repl = false;
    }

    if (process.env.VINYL_HOST && process.env.VINYLDNS_SECRET_KEY && process.env.VINYLDNS_ACCESS_KEY) {
      this.vinyldnsAccessKey = process.env.VINYLDNS_ACCESS_KEY;
      this.vinyldnsSecretKey = process.env.VINYLDNS_SECRET_KEY;
      this.host = process.env.VINYL_HOST;
    } else {
      console.error(
        'Error, must have VINYL_HOST, VINYLDNS_SECRET_KEY, and VINYLDNS_ACCESS_KEY set in environment'
      );
      process.exit(1);
    }
  }

  /**
   * Sign a request with AWS Signature v4 signing by generating necessary headers
   * @param path Endpoint path
   * @param options Header attributes for request
   */
  signRequest(path, options) {
    const isoDateStamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, ''); // Used to generate X-Amz-Date header
    const nonIsoDateStamp = isoDateStamp.substring(0, 8);

    options['headers']['host'] = options['host'];
    options['headers']['X-Amz-Date'] = isoDateStamp;

    // Construct string of signed headers
    const headerString = this.generateHeaderString(options);

    // Construct credential string
    const credential = [nonIsoDateStamp, options.region, options.service, 'aws4_request'].join('/');

    const stringToSign = [
      'AWS4-HMAC-SHA256',
      isoDateStamp,
      credential,
      CryptoJS.SHA256(this.canonicalString(path, options, isoDateStamp, headerString)).toString(
        CryptoJS.enc.Hex
      )
    ].join('\n');

    // Generate signing key
    const signingKey = this.generateAwsSig4SigningKey(this.vinyldnsSecretKey, nonIsoDateStamp);

    const signature = CryptoJS.HmacSHA256(stringToSign, signingKey);

    const authHeader = [
      'AWS4-HMAC-SHA256 Credential=' + this.vinyldnsAccessKey + '/' + credential,
      'SignedHeaders=' + headerString,
      'Signature=' + signature
    ].join(', ');

    // Add Authorization header
    options['headers']['Authorization'] = authHeader;
  }

  generateAwsSig4SigningKey(key, dateStamp, region = 'us-east-1', service = 'VinylDNS') {
    const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion = CryptoJS.HmacSHA256(region, kDate);
    const kService = CryptoJS.HmacSHA256(service, kRegion);
    return CryptoJS.HmacSHA256('aws4_request', kService);
  }

  generateHeaderString(options) {
    // Signed headers need to be in lowercase, sorted order
    let headerArr = [];
    for (const header in options['headers']) {
      headerArr.push(header.toLowerCase());
    }
    return headerArr.sort().join(';');
  }

  canonicalString(path, options, isoDateStamp, headerString) {
    const method = options['method'] || 'GET';
    const urlArr = path.split('?');
    const urlBase = urlArr[0];
    const urlParams = urlArr[1];
    const canonicalRequest = [method, urlBase, urlParams].join('\n');

    // Hashed canonical headers need to be in lowercase, sorted order
    let canonicalOptions = [];
    for (const header in options['headers']) {
      canonicalOptions.push(header.toLowerCase() + ':' + options['headers'][header]);
    }

    canonicalOptions.sort();

    const canonicalString = [
      canonicalRequest,
      canonicalOptions.join('\n') + '\n',
      headerString,
      CryptoJS.SHA256(options['body']).toString(CryptoJS.enc.Hex)
    ].join('\n');

    return canonicalString;
  }

  executeSignedRequest(path, options, errorMessageString) {
    let optionsCopy = JSON.parse(JSON.stringify(options));

    optionsCopy['service'] = 'VinylDNS';
    optionsCopy['region'] = 'us-east-1';
    optionsCopy['host'] = this.host;
    optionsCopy['path'] = path;

    this.signRequest(path, optionsCopy);

    return fetch(`http://${this.host}${path}`, optionsCopy)
      .then(response => {
        if (response.statusCode === 200) {
          response.json().then(json => console.log(json));
        } else {
          response.text().then(text => console.log(text));
        }
      })
      .catch(error => {
        console.log(`error ${errorMessageString}`);
        console.error(error);
      });
  }

  createZone(body) {
    const path = routes.createZone.path;
    const options = routes.createZone.options(body);
    return this.executeSignedRequest(path, options, 'creating zone');
  }

  updateZone(zoneId, body) {
    const path = routes.updateZone.path(zoneId);
    const options = routes.updateZone.options(body);
    return this.executeSignedRequest(path, options, 'updating zone');
  }

  deleteZone(zoneId) {
    const path = routes.deleteZone.path(zoneId);
    const options = routes.deleteZone.options;
    return this.executeSignedRequest(path, options, 'deleting zone');
  }

  getZone(zoneId) {
    const path = routes.getZone.path(zoneId);
    const options = routes.getZone.options;
    return this.executeSignedRequest(path, options, 'getting zone');
  }

  listZones(queryStrings) {
    const path = routes.listZones.path(queryStrings);
    const options = routes.listZones.options;
    return this.executeSignedRequest(path, options, 'listing zones');
  }

  syncZone(zoneId, body) {
    const path = routes.syncZone.path(zoneId);
    const options = routes.syncZone.options(body);
    return this.executeSignedRequest(path, options, 'syncing zone');
  }

  listZoneChanges(zoneId, queryStrings) {
    const path = routes.listZoneChanges.path(zoneId, queryStrings);
    const options = routes.listZoneChanges.options;
    return this.executeSignedRequest(path, options, 'listing zone changes');
  }

  createRecordSet(zoneId, body) {
    const path = routes.createRecordSet.path(zoneId);
    const options = routes.createRecordSet.options(body);
    return this.executeSignedRequest(path, options, 'creating record set');
  }

  updateRecordSet(zoneId, recordSetId, body) {
    const path = routes.updateRecordSet.path(zoneId, recordSetId);
    const options = routes.updateRecordSet.options(body);
    return this.executeSignedRequest(path, options, 'updating record set');
  }

  deleteRecordSet(zoneId, recordSetId) {
    const path = routes.deleteRecordSet.path(zoneId, recordSetId);
    const options = routes.deleteRecordSet.options;
    return this.executeSignedRequest(path, options, 'deleting record set');
  }

  getRecordSet(zoneId, recordSetId) {
    const path = routes.getRecordSet.path(zoneId, recordSetId);
    const options = routes.getRecordSet.options;
    return this.executeSignedRequest(path, options, 'getting record set');
  }

  listRecordSets(zoneId, queryStrings) {
    const path = routes.listRecordSets.path(zoneId, queryStrings);
    const options = routes.listRecordSets.options;
    return this.executeSignedRequest(path, options, 'listing record sets');
  }

  listRecordSetChanges(zoneId, queryStrings) {
    const path = routes.listRecordSetChanges.path(zoneId, queryStrings);
    const options = routes.listRecordSetChanges.options;
    return this.executeSignedRequest(path, options, 'listing record set changes');
  }

  createGroup(body) {
    const path = routes.createGroup.path;
    const options = routes.createGroup.options(body);
    return this.executeSignedRequest(path, options, 'creating group');
  }

  deleteGroup(groupId) {
    const path = routes.deleteGroup.path(groupId);
    const options = routes.deleteGroup.options;
    return this.executeSignedRequest(path, options, 'deleting group');
  }

  updateGroup(groupId, body) {
    const path = routes.updateGroup.path(groupId);
    const options = routes.updateGroup.options(body);
    return this.executeSignedRequest(path, options, 'updating group');
  }

  listGroups(queryStrings) {
    const path = routes.listGroups.path(queryStrings);
    const options = routes.listGroups.options;
    return this.executeSignedRequest(path, options, 'listing groups');
  }

  getGroup(groupId) {
    const path = routes.getGroup.path(groupId);
    const options = routes.getGroup.options;
    return this.executeSignedRequest(path, options, 'getting group');
  }

  createBatchChange(body) {
    const path = routes.createBatchChange.path;
    const options = routes.createBatchChange.options(body);
    return this.executeSignedRequest(path, options, 'creating batch change');
  }

  getBatchChange(batchId) {
    const path = routes.getBatchChange.path(batchId);
    const options = routes.getBatchChange.options;
    return this.executeSignedRequest(path, options, 'getting batch change');
  }

  listBatchChanges(queryStrings) {
    const path = routes.listBatchChanges.path(queryStrings);
    const options = routes.listBatchChanges.options;
    return this.executeSignedRequest(path, options, 'listing batch changes');
  }
}
