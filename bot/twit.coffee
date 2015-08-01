CONFIG = require 'config'
Promise = require 'bluebird'

Twit = require 'twit'
twit = new Twit CONFIG.twitter

module.exports = Promise.promisifyAll twit
