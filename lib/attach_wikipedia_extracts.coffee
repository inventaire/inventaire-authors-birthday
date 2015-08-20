Promise = require 'bluebird'
breq = require 'bluereq'
_ = require 'lodash'

module.exports = (candidates)->
  Promise.all candidates.map(attachWikipediaExtract)

attachWikipediaExtract = (candidate)->
  title = candidate.author.sitelinks?.enwiki?.title
  if title?
    title = escape title
    breq.get "https://inventaire.io/api/data/public?api=wp-extract&lang=en&title=#{title}"
    .then _.property('body.extract')
    .then (extract)->
      candidate.author.extract = extract
      return candidate
  else
    return Promise.resolve candidate