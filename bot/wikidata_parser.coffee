_ = require 'lodash'
wdk = require 'wikidata-sdk'

module.exports = wdParsers =
  findLabel: (author)-> findBestValue author.labels
  findDescription:(author)-> findBestValue author.descriptions

findBestValue = (obj)->
  unless obj? then return

  { en, fr, de, es, it, se, nl } = obj
  prioriatryValue = _.compact([ en, fr, de, es, it, se, nl ])[0]
  if prioriatryValue? then return prioriatryValue.value
  else
    for lang, obj of obj
      # should return the first found
      return obj.value

findProperty = (property, author)->
  claims = wdk.simplifyClaims author.claims
  return claims[property]

findFirstProperty = (property, author)->
  findProperty(property, author)?[0]

_.extend wdParsers,
  findTwitterUsername: findFirstProperty.bind(null, 'P2002')
  findDateOfDeath: findFirstProperty.bind(null, 'P570')
