// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('./utils');
const Promise = require('bluebird');

const getFreshAuthorsData = require('./get_fresh_authors_data');
const attachWmCommonsUrl = require('./attach_wm_commons_url');

const getTweetData = require('./get_tweet_data');
const postTweet = require('./post_tweet');
const getFbPostData = require('./get_fb_post_data');
const postFbPost = require('./fb_post');

module.exports = function(authorId){
  console.log('tweeting!!!'.green, authorId);
  return getFreshAuthorsData(authorId)
  .then(attachWmCommonsUrl)
  .then(doublePost)
  .catch(_.Error('tweet_author'));
};

var doublePost = freshAuthor => Promise.all([
  tw(freshAuthor)
  // I stopped trying to publish on facebook
  // as the authorization process is hell
  // fb(freshAuthor)
]);


var tw = freshAuthor => getTweetData(freshAuthor)
.then(_.Log('tweet data'))
.then(postTweet.bind(null, freshAuthor))
.catch(_.Error('tweet'));

const fb = freshAuthor => getFbPostData(freshAuthor)
.then(_.Log('fb post data'))
.then(postFbPost)
.catch(_.Error('fb post'));
