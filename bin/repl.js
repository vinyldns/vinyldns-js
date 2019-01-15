const repl = require('repl');
const VinylDns = require('../src/vinyldns');

const replServer = repl.start();
const apiUrl = process.env.VINYLDNS_API_SERVER;
const accessKeyId = process.env.VINYLDNS_ACCESS_KEY_ID;
const secretAccessKey = process.env.VINYLDNS_SECRET_ACCESS_KEY;

if (!apiUrl || !accessKeyId || !secretAccessKey) {
  throw new Error('The VinylDNS repl requires VINYLDNS_API_SERVER, VINYLDNS_ACCESS_KEY_ID, and VINYLDNS_SECRET_ACCESS_KEY environment variables');
}

replServer.context.vinyl = new VinylDns({
  apiUrl: apiUrl,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});
