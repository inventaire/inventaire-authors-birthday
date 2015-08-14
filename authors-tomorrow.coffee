getDayKey = require './lib/get_day_key'
oneDay = 24*60*60*1000
keepOnlyAuthorsWithKnownBooks = require './lib/keep_only_authors_with_known_books'
db = require('./lib/couch_wrapper')('authors', 'authors')
require 'colors'

filterCandidates = require './lib/filter_candidates'
searchTwitterAccounts = require './lib/search_twitter_accounts'
attachWikipediaExtracts = require './lib/attach_wikipedia_extracts'
saveCandidatesAsJsonFile = require './lib/save_candidates_as_json_file'
openTomorrowUI = require './lib/open_tomorrow_ui'

authorsTomorrow = ->
  console.log 'start'.green
  tomorrowTime = new Date().getTime() + oneDay
  console.log 'tomorrowTime', tomorrowTime
  tomorrow = getDayKey tomorrowTime
  console.log 'tomorrow: '.green, tomorrow

  db.viewByKey 'byBirthday', tomorrow
  .then keepOnlyAuthorsWithKnownBooks
  .then filterCandidates
  .then searchTwitterAccounts
  .then attachWikipediaExtracts
  .then saveCandidatesAsJsonFile
  .then -> console.log 'done'.green
  .then openTomorrowUI
  .catch (err)->
    console.log 'err'.red, err.stack or err


authorsTomorrow()
