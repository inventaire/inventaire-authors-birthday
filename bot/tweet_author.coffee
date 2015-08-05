CONFIG = require 'config'
twit = require './twit'
_ = require 'lodash'

getTweetData = require './get_tweet_data'

module.exports = (author)->
  console.log 'tweeting!!!'.green, author.id
  getTweetData author
  .then (tweet)->
    console.log 'tweet', tweet
    twit.postAsync 'statuses/update', tweet
    .then success.bind(null, author, tweet)
    .catch error.bind(null, author, tweet)
  .catch (err)-> console.log 'err'.red, (err.stack or err)

success = (author, tweet, data)->
  console.log 'ok'.green, author.id
error = (author, tweet, err)->
  console.error "#{author.id} err".red, err, err.cause.allErrors

