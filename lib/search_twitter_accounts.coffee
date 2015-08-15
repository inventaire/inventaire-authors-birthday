twit = require './twit'
{ findLabel, findDescription, findPicture, findWikipediaData, findOfficialWebsite } = require './wikidata_parser'
Promise = require 'bluebird'
holmes = Promise.promisify require('holmes')
breq = require 'bluereq'

module.exports = (candidates)->
  Promise.all candidates.map(searchTwitterAccount)
  .then dropAuthorsWithNoResults

searchTwitterAccount = (author)->
  label = findLabel author
  twit.getAsync 'users/search',
    q: escape label
    count: 6
  .then attachAccountsUrl
  .then parseResponse.bind(null, author, label)

attachAccountsUrl = (res)->
  accounts = res[0]
  return Promise.all  accounts.map(attachAccountUrl)

attachAccountUrl = (account)->
  breq.get account.url
  # unshorten the url
  .then holmes
  .then (url)->
    account.url = url
    return account

parseResponse = (author, label, accounts)->
  author.label = findLabel author
  author.description = findDescription author
  author.picture = findPicture author
  author.website = findOfficialWebsite author
  return candidate =
    author: author
    accounts: accounts

dropAuthorsWithNoResults = (candidates)->
  candidates.filter (candidate)->
    test = candidate.accounts.length > 0
    { id, label } = candidate.author
    if test then console.log 'remaining candidate'.yellow, id, label
    else console.log 'no twitter account found'.grey, id, label
    return test
