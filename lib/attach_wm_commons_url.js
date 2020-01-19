// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const breq = require('bluereq');
const wdk = require('wikidata-sdk');
const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(author){
  const image = findImageUrl(author);
  console.log('image', image);
  if (image != null) {
    return getWmCommonsUrl(image)
    .then(function(picture){
      author.picture = picture;
      return author;
    });
  } else {
    return Promise.resolve(author);
  }
};


const base = "https://inventaire.io/api/data/public?api=commons-thumb&width=1000&file=";
var getWmCommonsUrl = function(file){
  console.log('file', file);
  return breq.get(`${base}${file}`)
  .then(_.property('body.thumbnail'));
};

var findImageUrl = function(author){
  const claims = wdk.simplifyClaims(author.claims);
  return (claims.P18 != null ? claims.P18[0] : undefined);
};
