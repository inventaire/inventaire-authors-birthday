breq = require 'bluereq'
wdk = require 'wikidata-sdk'
_ = require 'lodash'
Promise = require 'bluebird'

module.exports = (author)->
  image = findImageUrl author
  console.log 'image', image
  if image?
    getWmCommonsUrl image
    .then (picture)->
      author.picture = picture
      return author
  else
    return Promise.resolve author


base = "https://inventaire.io/api/data/public?api=commons-thumb&width=1000&file="
getWmCommonsUrl = (file)->
  console.log 'file', file
  breq.get "#{base}#{file}"
  .then _.property('body.thumbnail')

findImageUrl = (author)->
  claims = wdk.simplifyClaims author.claims
  return claims.P18?[0]
