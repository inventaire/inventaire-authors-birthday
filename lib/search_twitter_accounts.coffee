twit = require './twit'
{ findLabel, findDescription, findPicture, findWikipediaData } = require './wikidata_parser'
Promise = require 'bluebird'

module.exports = (candidates)->
  Promise.all candidates.map(searchTwitterAccount)
  .then dropAuthorsWithNoResults

searchTwitterAccount = (author)->
  label = findLabel author
  twit.getAsync 'users/search',
    q: escape label
    count: 6
  .then parseResponse.bind(null, author, label)

parseResponse = (author, label, res)->
  author.label = findLabel author
  author.description = findDescription author
  author.picture = findPicture author
  return candidate =
    author: author
    accounts: res[0]

dropAuthorsWithNoResults = (candidates)->
  candidates.filter (candidate)-> candidate.accounts.length > 0
