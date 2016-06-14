#!/usr/bin/env coffee
wdk = require 'wikidata-sdk'
cache = require './cache'
breq = require 'bluereq'

query = (daysBeforeBirthday=0)->
  """
  SELECT DISTINCT ?entity ?entityLabel (year(?date) as ?year)
  WHERE
  {
     ?entity wdt:P569 ?date .
     ?book wdt:P50 ?entity .
     ?book wdt:P31/wdt:P279* wd:Q571 .
     SERVICE wikibase:label {
       bd:serviceParam wikibase:language "en" .
     }
     FILTER (datatype(?date) = xsd:dateTime)
     FILTER (month(?date) = month(now()))
     FILTER (day(?date) = day(now())+#{daysBeforeBirthday})
  }
  """

request = (daysBeforeBirthday)->
  url = wdk.sparqlQuery query(daysBeforeBirthday)
  breq.get url
  .then (res)->
    res.body.results.bindings
    .map (el)-> el.entity.value.replace('http://www.wikidata.org/entity/', '')
  .then (ids)-> {ids: ids}
  .catch (err)->
    console.log err
    throw err


getDayKey = (daysBeforeBirthday=0)->
  [year, month, day ] = new Date().toISOString().split('T')[0].split('-')
  day = Number(day) + daysBeforeBirthday
  return "#{year}-#{month}-#{day}"

module.exports = (daysBeforeBirthday)->
  key = getDayKey daysBeforeBirthday
  cache.get key, request.bind(null, daysBeforeBirthday)
  .then (res)->
    console.log 'getAuthorsByBirthday', key, res
    # return only the ids
    return res.ids
