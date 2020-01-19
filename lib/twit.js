const CONFIG = require('config');
const Promise = require('bluebird');

const Twit = require('twit');
const twit = new Twit(CONFIG.twitter);

module.exports = Promise.promisifyAll(twit);
