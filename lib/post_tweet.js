twit = require './twit'
_ = require './utils'

module.exports = (author, tweet)->
  _.log tweet, 'tweet'
  twit.postAsync 'statuses/update', tweet
  .then _.success.bind(null, author.id, 'ok')
  .catch error.bind(null, author, tweet)

error = (author, tweet, err)->
  console.error "#{author.id} err".red, err, err.cause.allErrors
