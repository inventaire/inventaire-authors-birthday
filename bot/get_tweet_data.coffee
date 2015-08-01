getStatus = require './get_status'
getImageId = require './get_image_id'

module.exports = (author)->
  getImageId author
  .then getTweet.bind(null, author)

getTweet = (author, mediaId)->
  tweet = { status: getStatus(author) }
  if mediaId? then tweet.media_id_string = "#{mediaId}"
  return tweet