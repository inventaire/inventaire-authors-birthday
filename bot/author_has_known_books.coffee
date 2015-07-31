breq = require 'bluereq'

module.exports = (author)->
  numeridId = author.id.replace 'Q', ''
  url = "http://wdq.wmflabs.org/api?q=claim[50:#{numeridId}]"
  breq.get url
  .then (res)->
    bool = res.body.items.length > 0
    return [ author, bool]
  .catch console.error.bind(console, 'wdq query')