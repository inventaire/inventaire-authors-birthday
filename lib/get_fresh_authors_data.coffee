wdk = require 'wikidata-sdk'
breq = require 'bluereq'

module.exports = (author)->
  url = wdk.getEntities [author.id]
  breq.get url
  .then (res)->
    freshAuthor = res.body.entities[author.id]
    return freshAuthor
  .catch (err)->
    console.log 'couldnt getFreshAuthorsData'.red, err
    return author
