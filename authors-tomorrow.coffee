_ = require 'lodash'
require 'colors'
getAuthorsByBirthday = require './lib/get_authors_by_birthday'
filterCandidates = require './lib/filter_candidates'
searchTwitterAccounts = require './lib/search_twitter_accounts'
attachWikipediaExtracts = require './lib/attach_wikipedia_extracts'
saveCandidatesAsJsonFile = require './lib/save_candidates_as_json_file'
openTomorrowUI = require './lib/open_tomorrow_ui'


args = process.argv.slice(2)
# default to tomorrow => days = 1
days = args[0] or 1
days = Number days

console.log 'days: ', days

authorsTomorrow = ->
   console.log 'start'.green

  getAuthorsByBirthday days
  .then filterCandidates
  .then searchTwitterAccounts
  .then attachWikipediaExtracts
  .then saveCandidatesAsJsonFile
  .then -> console.log 'done'.green
  .then openTomorrowUI
  .catch (err)->
    console.log 'err'.red, err.stack or err


authorsTomorrow()
