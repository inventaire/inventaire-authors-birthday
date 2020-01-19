// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
const CONFIG = require('config');
const couchWrapper = require('inv-cot');

const params = {
  hostname: CONFIG.db.host,
  port: CONFIG.db.port,
  auth: CONFIG.db.auth()
};

if (CONFIG.db.protocol === 'https') {
  params.ssl = true;
}

module.exports = couchWrapper(params);