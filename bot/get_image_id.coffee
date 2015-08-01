breq = require 'bluereq'
wdk = require 'wikidata-sdk'
getMediaId = require './get_media_id'
_ = require 'lodash'
Promise = require 'bluebird'

module.exports = (author)->
  image = findImageUrl author
  console.log 'image', image
  if image?
    getWmCommonsUrl image
    .then getMediaId
  else
    return Promise.resolve()


base = "https://inventaire.io/api/data/public?api=commons-thumb&width=1000&file="
getWmCommonsUrl = (file)->
  console.log 'file', file
  breq.get "#{base}#{file}"
  .then _.property('body.thumbnail')

findImageUrl = (author)->
  claims = wdk.simplifyClaims author.claims
  return claims.P18?[0]
