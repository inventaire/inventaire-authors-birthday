const fb = require('./fb')
const _ = require('./utils')

const fbAccessToken = require('./fb_access_token')

const { pageId, longLivedToken } = require('config').facebook

const endpoint = `${pageId}/feed`

module.exports = data => fbAccessToken.get()
  .then(function (token) {
    console.log('token?'.orange, token)
    data = _.extend(data,
      { access_token: token })

    return fb.api(endpoint, 'post', data)
      .then(_.Log('fb post'))
  }).catch(_.Error('fb post'))
