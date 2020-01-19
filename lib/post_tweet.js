/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const twit = require('./twit');
const _ = require('./utils');

module.exports = function(author, tweet){
  _.log(tweet, 'tweet');
  return twit.postAsync('statuses/update', tweet)
  .then(_.success.bind(null, author.id, 'ok'))
  .catch(error.bind(null, author, tweet));
};

var error = (author, tweet, err) => console.error(`${author.id} err`.red, err, err.cause.allErrors);
