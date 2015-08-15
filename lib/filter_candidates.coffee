_ = require 'lodash'
wdk = require 'wikidata-sdk'
breq = require 'bluereq'
{ findLabel, findDescription, findTwitterUsername, findDateOfDeath } = require './wikidata_parser'

twitterSuccess = new Date('2011').getTime()


module.exports = (authors)->
  ids = authors.map _.property('id')
  breq.get wdk.getEntities(ids)
  .then (res)->
    authors = _.values res.body.entities
    return authors.filter twitterPropertyMightBeMissing

twitterPropertyMightBeMissing = (author)->
  label = findLabel author
  twitter = findTwitterUsername author
  death = findDateOfDeath author
  unless label?
    console.log 'no label found'.orange, author.id
    return false

  if twitter
    console.log 'twitter found'.green, author.id, label
    return false

  if death < twitterSuccess
    console.log "gone before twitter was created".grey, author.id, label
    return false

  console.log 'candidate'.blue, author.id, label
  return true
