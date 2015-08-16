fb = require './fb'
_ = require './utils'

fbAccessToken = require './fb_access_token'

{ pageId, longLivedToken } = require('config').facebook

endpoint = "#{pageId}/feed"

module.exports = (data)->
  data = _.extend data,
    access_token: longLivedToken

  fb.api endpoint, 'post', data
  .then _.Log('fb post')
  .catch _.Error('fb post')
