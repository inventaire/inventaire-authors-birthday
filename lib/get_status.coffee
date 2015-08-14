{ findLabel, findDescription, findTwitterUsername } = require './wikidata_parser'

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
  url = inventaireLink id, label

  text = "happy birthday #{label}"
  text += " @#{twitterUsername}"  if twitterUsername?
  text += '!'
  text += " #{desc}"  if desc?

  return text[0..textMaxLength] + ' ' + url

inventaireLink = (authorId, authorLabel)->
  # escaping only spaces as a full escape creates problematic urls
  # such as https://inventaire.io/entity/wd:Q465681/Sophie%2C%20Countess%20of%20S%E9gur
  # making both (?!) the server and client crash:
  # - client gets "URIError: malformed URI sequence"
  # - server gets "TypeError: Failed to decode param 'entity/wd:Q465681/Sophie%2C%20Countess%20of%20S%E9gur'"
  # escaping spaces
  # replacing non-alphanumeric characters by escaped spaces
  authorLabel = authorLabel.replace(/\W/g, ' ').replace /\s/g, '%20'
  "https://inventaire.io/entity/wd:#{authorId}/#{authorLabel}"
