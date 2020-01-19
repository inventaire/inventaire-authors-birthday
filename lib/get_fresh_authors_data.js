// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const wdk = require('wikidata-sdk');
const breq = require('bluereq');

module.exports = function(authorId){
  const url = wdk.getEntities([authorId]);
  return breq.get(url)
  .then(res => res.body.entities[authorId])
  .catch(function(err){
    console.log('couldnt getFreshAuthorsData'.red, authorId.yellow, err);
    throw err;
  });
};
