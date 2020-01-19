_ = require './utils'
Promise = require 'bluebird'

getFreshAuthorsData = require './get_fresh_authors_data'
attachWmCommonsUrl = require './attach_wm_commons_url'

getTweetData = require './get_tweet_data'
postTweet = require './post_tweet'
getFbPostData = require './get_fb_post_data'
postFbPost = require './fb_post'

module.exports = (authorId)->
  console.log 'tweeting!!!'.green, authorId
  getFreshAuthorsData authorId
  .then attachWmCommonsUrl
  .then doublePost
  .catch _.Error('tweet_author')

doublePost = (freshAuthor)->
  Promise.all [
    tw(freshAuthor)
    # I stopped trying to publish on facebook
    # as the authorization process is hell
    # fb(freshAuthor)
  ]


tw = (freshAuthor)->
  getTweetData(freshAuthor)
  .then _.Log('tweet data')
  .then postTweet.bind(null, freshAuthor)
  .catch _.Error('tweet')

fb = (freshAuthor)->
  getFbPostData(freshAuthor)
  .then _.Log('fb post data')
  .then postFbPost
  .catch _.Error('fb post')
