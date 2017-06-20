Promise = require 'bluebird'
base64 = Promise.promisifyAll require('node-base64-image')
twit = require './twit'

module.exports = (author)->
  url = author.picture
  console.log 'author.picture', url
  unless url?
    console.log 'no url provided at getMediaId'.red
    return Promise.resolve()

  base64.base64encoderAsync url, {}
  .then getBase64Image
  .then postBase64Media
  .then parseTwitterResponse


getBase64Image = (res)-> res.toString('base64')
postBase64Media = (b64image)->
  twit.postAsync 'media/upload', { media_data: b64image }

parseTwitterResponse = (res)-> res.media_id_string
