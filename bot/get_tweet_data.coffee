getStatus = require './get_status'
getImageId = require './get_image_id'
breq = require 'bluereq'
wdk = require 'wikidata-sdk'

module.exports = (author)->
  getFreshAuthorsData author
  .then (freshAuthor)->
    getImageId(freshAuthor)
    .then getTweet.bind(null, freshAuthor)

getTweet = (author, mediaIdString)->
  console.log 'mediaIdString', mediaIdString
  tweet = { status: getStatus(author) }
  if mediaIdString?
    # JS doesnt handle large integers so media_id_string is a work-around
    # but passing the media_id_string parameters doesnt seem to work
    # Luckily, passing media_id_string in an array to media_id do work. don't ask
    tweet.media_id_string = mediaIdString
    tweet.media_ids = [mediaIdString]
  return tweet

getFreshAuthorsData = (author)->
  url = wdk.getEntities [author.id]
  breq.get url
  .then (res)->
    freshAuthor = res.body.entities[author.id]
    return freshAuthor
  .catch (err)->
    console.log 'couldnt getFreshAuthorsData'.red, err
    return author
