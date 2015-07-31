schedule = require 'node-schedule'
colors = require 'colors'

db = require('./lib/cot_base')('authors', 'authors')

getTodayKey = require './bot/get_today_key'
keepOnlyAuthorsWithKnownBooks = require './bot/keep_only_authors_with_known_books'
tweetAuthorsAtInterval = require './bot/tweet_authors_at_interval'
tweetAuthor = require './bot/tweet_author'

initTodayGreetings = ->
  today = getTodayKey()
  console.log 'today: '.green, today

  db.viewByKey 'byBirthday', today
  .then keepOnlyAuthorsWithKnownBooks
  .then tweetAuthorsAtInterval.bind(null, tweetAuthor)
  .catch console.error.bind(console, 'general err')

initTodayGreetings()

oneDay = 24*60*60*1000
setInterval initTodayGreetings, oneDay