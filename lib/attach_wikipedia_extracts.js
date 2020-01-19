const Promise = require('bluebird')
const breq = require('bluereq')
const _ = require('lodash')

module.exports = candidates => Promise.all(candidates.map(attachWikipediaExtract))

var attachWikipediaExtract = function (candidate) {
  let title = __guard__(candidate.author.sitelinks != null ? candidate.author.sitelinks.enwiki : undefined, x => x.title)
  if (title != null) {
    title = escape(title)
    return breq.get(`https://inventaire.io/api/data/public?api=wp-extract&lang=en&title=${title}`)
      .then(_.property('body.extract'))
      .then(function (extract) {
        candidate.author.extract = extract
        candidate.author.wikipedia = `https://en.wikipedia.org/wiki/${title}`
        return candidate
      })
  } else {
    return Promise.resolve(candidate)
  }
}
function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
