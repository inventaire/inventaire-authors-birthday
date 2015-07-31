CONFIG = require 'config'
Twit = require 'twit'
twit = new Twit CONFIG.twitter
_ = require 'lodash'

# depends on twitter config, might evolve
shortLinkLength = 24
# removing one character to keep it for a space before the url
textMaxLength = 140  - 1 - shortLinkLength

module.exports = (author)->
  tweet = tweetData(author)
  console.log 'tweeting!!!'.green, author.id
  twit.post 'statuses/update', tweetData(author), cb.bind(null, author)

tweetData = (author)->
  { id } = author
  label = findLabel author
  desc = findDescription author
  url = inventaireLink id, label
  return options =
    status: optimizeStatus label, desc, url

inventaireLink = (authorId, authorLabel)->
  authorLabel = escape authorLabel
  "https://inventaire.io/entity/wd:#{authorId}/#{authorLabel}"

cb = (author, tweet, err, data)->
  if err?
    console.error 'err'.red, err, author, tweet
  else
    console.log 'ok'.green, tweet


findLabel = (author)-> findBestValue author.labels
findDescription = (author)-> findBestValue author.descriptions

findBestValue = (obj)->
  { en, fr, de, es, it, se, nl } = obj
  prioriatryValue = _.compact([ en, fr, de, es, it, se, nl ])[0]
  if prioriatryValue? then return prioriatryValue.value
  else
    for lang, obj of obj
      # should return the first found
      return obj.value

optimizeStatus = (label, desc, url)->
  text = "happy birthday #{label}!"
  if desc? then text += ' ' + desc

  return text[0..textMaxLength] + ' ' + url
