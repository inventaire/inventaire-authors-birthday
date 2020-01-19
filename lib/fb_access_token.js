/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let helpers;
const { appId, appSecret, longLivedToken } = require('config').facebook;
const fb = require('./fb');
const _ = require('./utils');
const Promise = require('bluebird');

const params = {
  client_id: appId,
  client_secret: appSecret,
  grant_type: 'client_credentials'
};

module.exports = (helpers = {
  get() {
    return fb.api('oauth/access_token', params)
    .then(_.property('access_token'))
    .then(_.Log('get token res'))
    .catch(_.ErrorRethrow('get token err'));
  },
    // Promise.resolve longLivedToken
  set() {
    return helpers.get()
    .then(_.Log('token'))
    .then(fb.setAccessToken.bind(fb));
  }
});
