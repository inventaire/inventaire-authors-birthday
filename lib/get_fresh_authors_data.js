wdk = require 'wikidata-sdk'
breq = require 'bluereq'

module.exports = (authorId)->
  url = wdk.getEntities [authorId]
  breq.get url
  .then (res)-> res.body.entities[authorId]
  .catch (err)->
    console.log 'couldnt getFreshAuthorsData'.red, authorId.yellow, err
    throw err
