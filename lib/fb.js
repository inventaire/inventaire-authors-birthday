// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
const CONFIG = require('config');
const fb = require('fb');
const Promise = require('bluebird');

fb.options(CONFIG.facebook);

module.exports = {
  api: Promise.promisify(fb.napi, fb),
  setAccessToken(token){
    console.log('token'.cyan, token);
    fb.setAccessToken(token);
    return token;
  },
  options: fb.options
};