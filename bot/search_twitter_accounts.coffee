twit = require './twit'
{ findLabel, findDescription } = require './wikidata_parser'


module.exports = (candidates)->
  candidates.forEach searchTwitterAccount

searchTwitterAccount = (author)->
  label = findLabel author
  twit.getAsync 'users/search',
    q: escape label
    count: 3
  .then parseResponse.bind(null, author, label)

parseResponse = (author, label, res)->
  console.log '--------------------------------'.grey
  descriptions = findDescription author
  console.log label.green, author.id, ' - ', descriptions
  body = res[0]
  body.forEach logUser

logUser = (user)->
  { name, description, screen_name, location, followers_count, verified } = user
  console.log "@#{screen_name}".blue, name, ' - ' , description, location
  console.log 'location:', location, 'followers:', followers_count
  if verified then console.log 'verified'.green
