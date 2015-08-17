{ findLabel, findDescription, findTwitterUsername } = require './wikidata_parser'
getAuthorsInventaireLink = require './get_authors_inventaire_link'

Promise = require 'bluebird'

module.exports = (author)->
  { id, picture } = author
  label = findLabel author
  desc = findDescription author
  url = getAuthorsInventaireLink id, label

  text = "happy birthday #{label}!"
  text += " #{desc}"  if desc?

  data =
    message: text
    link: url
    name: label

  if picture? then data.picture = picture

  Promise.resolve data
