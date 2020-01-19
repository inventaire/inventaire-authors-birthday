const _ = require('lodash')
require('colors')
const getAuthorsByBirthday = require('./lib/get_authors_by_birthday')
const filterCandidates = require('./lib/filter_candidates')
const searchTwitterAccounts = require('./lib/search_twitter_accounts')
const attachWikipediaExtracts = require('./lib/attach_wikipedia_extracts')
const saveCandidatesAsJsonFile = require('./lib/save_candidates_as_json_file')
const openTomorrowUI = require('./lib/open_tomorrow_ui')

const args = process.argv.slice(2)
// default to tomorrow => days = 1
let days = args[0] || 1
days = Number(days)

console.log('days: ', days)

const authorsTomorrow = () => console.log('start'.green)

getAuthorsByBirthday(days)
  .then(filterCandidates)
  .then(searchTwitterAccounts)
  .then(attachWikipediaExtracts)
  .then(saveCandidatesAsJsonFile)
  .then(() => console.log('done'.green))
  .then(openTomorrowUI)
  .catch(err => console.log('err'.red, err.stack || err))

authorsTomorrow()
