const breq = require('bluereq')
const wdk = require('wikidata-sdk')
const _ = require('lodash')
const Promise = require('bluebird')

module.exports = function (author) {
  const image = findImageUrl(author)
  console.log('image', image)
  if (image != null) {
    return getWmCommonsUrl(image)
      .then(function (picture) {
        author.picture = picture
        return author
      })
  } else {
    return Promise.resolve(author)
  }
}

const base = 'https://inventaire.io/api/data/public?api=commons-thumb&width=1000&file='
var getWmCommonsUrl = function (file) {
  console.log('file', file)
  return breq.get(`${base}${file}`)
    .then(_.property('body.thumbnail'))
}

var findImageUrl = function (author) {
  const claims = wdk.simplifyClaims(author.claims)
  return (claims.P18 != null ? claims.P18[0] : undefined)
}
