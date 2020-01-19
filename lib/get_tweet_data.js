/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const getStatus = require('./get_status');
const getMediaId = require('./get_media_id');

module.exports = author => getMediaId(author)
.then(getTweet.bind(null, author));

var getTweet = function(author, mediaIdString){
  console.log('mediaIdString', mediaIdString);
  const tweet = { status: getStatus(author) };
  if (mediaIdString != null) {
    // JS doesnt handle large integers so media_id_string is a work-around
    // but passing the media_id_string parameters doesnt seem to work
    // Luckily, passing media_id_string in an array to media_id do work. don't ask
    tweet.media_id_string = mediaIdString;
    tweet.media_ids = [mediaIdString];
  }
  return tweet;
};
