const wdk = require('wikidata-sdk')
const cache = require('./cache')
const breq = require('bluereq')

const query = (daysBeforeBirthday = 0) => `\
SELECT DISTINCT ?entity ?entityLabel (year(?date) as ?year)
WHERE
{
 ?entity wdt:P569 ?date .
 ?timevalue wikibase:timeValue ?date .
 ?timevalue wikibase:timePrecision "11"^^xsd:integer .
 ?book wdt:P50 ?entity .
 ?book wdt:P31/wdt:P279* wd:Q571 .
 SERVICE wikibase:label {
   bd:serviceParam wikibase:language "en" .
 }
 FILTER (datatype(?date) = xsd:dateTime)
 FILTER (month(?date) = month(now()))
 FILTER (day(?date) = day(now())+${daysBeforeBirthday})
}\
`

const request = function (daysBeforeBirthday) {
  const url = wdk.sparqlQuery(query(daysBeforeBirthday))
  return breq.get(url)
    .then(res => res.body.results.bindings
      .map(el => el.entity.value.replace('http://www.wikidata.org/entity/', ''))).then(ids => ({
      ids
    }))
    .catch(function (err) {
      console.log(err)
      throw err
    })
}

const getDayKey = function (daysBeforeBirthday = 0) {
  let [year, month, day] = Array.from(new Date().toISOString().split('T')[0].split('-'))
  day = Number(day) + daysBeforeBirthday
  return `${year}-${month}-${day}`
}

module.exports = function (daysBeforeBirthday) {
  const key = getDayKey(daysBeforeBirthday)
  return cache.get(key, request.bind(null, daysBeforeBirthday))
    .then(function (res) {
      console.log('getAuthorsByBirthday', key, res)
      // return only the ids
      return res.ids
    })
}
