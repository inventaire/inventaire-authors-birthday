// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
const CONFIG = require('config');
const Promise = require('bluebird');

const Twit = require('twit');
const twit = new Twit(CONFIG.twitter);

module.exports = Promise.promisifyAll(twit);
