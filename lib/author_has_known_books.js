const breq = require('bluereq')

module.exports = function (author) {
  const numeridId = author.id.replace('Q', '')
  const url = `http://wdq.wmflabs.org/api?q=claim[50:${numeridId}]`
  return breq.get(url)
    .catch(fallback.bind(null, author.id))
    .then(function (res) {
      const bool = res.body.items.length > 0
      return [author, bool]
    })
    .catch(function (err) {
      console.error('wdq query'.red, err.stack)
      throw err
    })
}

var fallback = function (authorId) {
  console.log('failed to query wdq for '.orange, authorId)
  console.log('using fallback'.green)
  return breq.get(`http://localhost:5353/claim?p=P50&q=${authorId}`)
}
