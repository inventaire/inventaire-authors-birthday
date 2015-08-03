Promise = require 'bluebird'
base64 = Promise.promisifyAll require('node-base64-image')
twit = require './twit'

module.exports = getMediaId = (url)->
  unless url?
    return console.log 'no url provided at getMediaId'.red

  base64.base64encoderAsync url, {}
  .then getBase64Image
  .then postBase64Media
  .then parseTwitterResponse


getBase64Image = (res)-> res.toString('base64')
postBase64Media = (b64image)->
  twit.postAsync 'media/upload', { media_data: b64image }

parseTwitterResponse = (res)->
  console.log 'twitter res', res[0]
  res[0].media_id_string