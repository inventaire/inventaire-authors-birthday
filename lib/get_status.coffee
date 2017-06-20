{ findLabel, findDescription, findTwitterUsername } = require './wikidata_parser'
getAuthorsInventaireLink = require './get_authors_inventaire_link'

# depends on twitter config, might evolve
shortLinkLength = 24
# removing one character to keep it for a space before the url
textMaxLength = 140  - 1 - shortLinkLength


module.exports = (author)->
  # console.log 'author', author
  { id } = author
  label = findLabel author
  twitterUsername = findTwitterUsername author
  desc = findDescription author
  url = getAuthorsInventaireLink id

  text = "happy birthday #{label}"
  text += " @#{twitterUsername}"  if twitterUsername?
  text += '!'
  text += " #{desc}"  if desc?

  return text[0..textMaxLength] + ' ' + url
