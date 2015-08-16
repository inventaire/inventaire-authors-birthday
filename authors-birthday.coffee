schedule = require 'node-schedule'
colors = require 'colors'

db = require('./lib/couch_wrapper')('authors', 'authors')

getDayKey = require './lib/get_day_key'
keepOnlyAuthorsWithKnownBooks = require './lib/keep_only_authors_with_known_books'
postAuthorsAtInterval = require './lib/post_authors_at_interval'
postAuthor = require './lib/post_author'

initTodayGreetings = ->
  today = getDayKey()
  console.log 'today: '.green, today

  db.viewByKey 'byBirthday', today
  .then keepOnlyAuthorsWithKnownBooks
  .then postAuthorsAtInterval.bind(null, postAuthor)
  .catch (err)->
    console.log 'general err'.red, err.stack or err

time = {hour: 8, minute: 0}
console.log 'daily starting time'.green, time
schedule.scheduleJob time, initTodayGreetings

# just keeping the server alive node-schedule can't
alive = -> console.log 'alive!'.green
setInterval alive, 24*60*60*1000
