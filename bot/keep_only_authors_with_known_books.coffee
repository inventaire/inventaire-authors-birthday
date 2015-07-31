_ = require 'lodash'
Promise = require 'bluebird'

authorHasKnownBooks = require './author_has_known_books'

module.exports = (authors)->
  promises = authors.map(authorHasKnownBooks)
  Promise.all promises
  .then keepValidAuthors
  .then logValidAuthorsIds
  .catch console.error.bind(console, 'keepOnlyAuthorsWithKnownBooks')


keepValidAuthors = (allAuthors)->
  _.compact allAuthors.map(filterAuthorsWithBooks)

logValidAuthorsIds = (validAuthors)->
  console.log 'kept', validAuthors.map(_.property('id'))
  return validAuthors

filterAuthorsWithBooks = (tuple)->
  [ author, bool] = tuple
  if bool
    # console.log author.id, 'kept'
    return author
  else
    console.warn author.id, 'rejected'
    return null