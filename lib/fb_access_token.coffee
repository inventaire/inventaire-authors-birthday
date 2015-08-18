{ appId, appSecret, longLivedToken } = require('config').facebook
fb = require './fb'
_ = require './utils'
Promise = require 'bluebird'

params =
  client_id: appId
  client_secret: appSecret
  grant_type: 'client_credentials'

module.exports = helpers =
  get: ->
    # fb.api 'oauth/access_token', params
    # .then _.property('access_token')
    # .then _.Log('get token res')
    # .catch _.Error('get token err')
    Promise.resolve longLivedToken
  set: ->
    helpers.get()
    .then _.Log('token')
    .then fb.setAccessToken.bind(fb)
