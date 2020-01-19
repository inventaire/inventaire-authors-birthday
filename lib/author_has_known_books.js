breq = require 'bluereq'

module.exports = (author)->
  numeridId = author.id.replace 'Q', ''
  url = "http://wdq.wmflabs.org/api?q=claim[50:#{numeridId}]"
  breq.get url
  .catch fallback.bind(null, author.id)
  .then (res)->
    bool = res.body.items.length > 0
    return [ author, bool]
  .catch (err)->
    console.error 'wdq query'.red, err.stack
    throw err


fallback = (authorId)->
  console.log 'failed to query wdq for '.orange, authorId
  console.log 'using fallback'.green
  breq.get "http://localhost:5353/claim?p=P50&q=#{authorId}"