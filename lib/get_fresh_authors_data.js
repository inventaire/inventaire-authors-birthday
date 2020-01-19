const wdk = require('wikidata-sdk')
const breq = require('bluereq')

module.exports = function (authorId) {
  const url = wdk.getEntities([authorId])
  return breq.get(url)
    .then(res => res.body.entities[authorId])
    .catch(function (err) {
      console.log('couldnt getFreshAuthorsData'.red, authorId.yellow, err)
      throw err
    })
}
