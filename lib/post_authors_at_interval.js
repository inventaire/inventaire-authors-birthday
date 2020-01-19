# spreading on only 18 hours of the day
day = 18*60*60*1000
_ = require 'lodash'
postAuthor = require './post_author'

module.exports = (authors)->
  interval = day / authors.length

  # avoid having all the major authors at the end of the day
  authors = _.shuffle authors

  tweetNextAuthor = ->
    unless authors.length > 0
      console.warn authors, 'no authors today??'.yellow

    author = authors.pop()
    if authors.length > 0
      postAuthor author
      .then -> console.info 'waiting for more'.grey
      setTimeout tweetNextAuthor, interval
    else
      console.log 'done for today!'.green

  # initializing the recursion
  tweetNextAuthor authors, interval

  return
