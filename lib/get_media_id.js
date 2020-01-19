const Promise = require('bluebird')
const base64 = Promise.promisifyAll(require('node-base64-image'))
const twit = require('./twit')

module.exports = function (author) {
  const url = author.picture
  console.log('author.picture', url)
  if (url == null) {
    console.log('no url provided at getMediaId'.red)
    return Promise.resolve()
  }

  return base64.base64encoderAsync(url, {})
    .then(getBase64Image)
    .then(postBase64Media)
    .then(parseTwitterResponse)
}

var getBase64Image = res => res.toString('base64')
var postBase64Media = b64image => twit.postAsync('media/upload', { media_data: b64image })

var parseTwitterResponse = res => res.media_id_string
