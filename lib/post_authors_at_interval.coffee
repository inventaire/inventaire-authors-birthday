halfDay = 12*60*60*1000

module.exports = (tweet, authors)->
  # spreading tweets over 12 hours
  # to kind of neutralize timezone effects
  interval = halfDay / authors.length

  tweetNextAuthor = ->
    unless authors.length > 0
      console.warn authors, 'no authors today??'.yellow

    author = authors.pop()
    if authors.length > 0
      tweet author
      .then -> console.info 'waiting for more'.grey
      setTimeout tweetNextAuthor, interval
    else
      console.log 'done for today!'.green

  # initializing the recursion
  tweetNextAuthor authors, interval

  return
