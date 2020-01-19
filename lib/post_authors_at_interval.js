// spreading on only 18 hours of the day
const day = 18 * 60 * 60 * 1000
const _ = require('lodash')
const postAuthor = require('./post_author')

module.exports = function (authors) {
  const interval = day / authors.length

  // avoid having all the major authors at the end of the day
  authors = _.shuffle(authors)

  var tweetNextAuthor = function () {
    if (authors.length <= 0) {
      console.warn(authors, 'no authors today??'.yellow)
    }

    const author = authors.pop()
    if (authors.length > 0) {
      postAuthor(author)
        .then(() => console.info('waiting for more'.grey))
      return setTimeout(tweetNextAuthor, interval)
    } else {
      return console.log('done for today!'.green)
    }
  }

  // initializing the recursion
  tweetNextAuthor(authors, interval)
}
