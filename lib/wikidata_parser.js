let wdParsers
const _ = require('lodash')
const wdk = require('wikidata-sdk')

module.exports = (wdParsers = {
  findLabel (author) { return findBestValue(author.labels) },
  findDescription (author) { return findBestValue(author.descriptions) },
  findPicture (author) {
    let file = findFirstProperty('P18', author)
    if (file) {
      file = escape(file)
      return `https://commons.wikimedia.org/w/thumb.php?width=200&f=${file}`
    }
  }
})

var findBestValue = function (obj) {
  if (obj == null) { return }

  const { en, fr, de, es, it, se, nl } = obj
  const prioriatryValue = _.compact([en, fr, de, es, it, se, nl])[0]
  if (prioriatryValue != null) {
    return prioriatryValue.value
  } else {
    for (const lang in obj) {
      // should return the first found
      obj = obj[lang]
      return obj.value
    }
  }
}

const findProperty = function (property, author) {
  const claims = wdk.simplifyClaims(author.claims)
  return claims[property]
}

var findFirstProperty = (property, author) => __guard__(findProperty(property, author), x => x[0])

_.extend(wdParsers, {
  findTwitterUsername: findFirstProperty.bind(null, 'P2002'),
  findDateOfDeath: findFirstProperty.bind(null, 'P570'),
  findOfficialWebsite: findFirstProperty.bind(null, 'P856')
}
)

function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
