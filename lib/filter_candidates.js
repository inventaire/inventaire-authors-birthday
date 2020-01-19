/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash');
const wdk = require('wikidata-sdk');
const breq = require('bluereq');
const { findLabel, findDescription, findTwitterUsername, findDateOfDeath } = require('./wikidata_parser');

const twitterSuccess = new Date('2011').getTime();


module.exports = authorsIds => breq.get(wdk.getEntities(authorsIds))
.then(function(res){
  const authors = _.values(res.body.entities);
  return authors.filter(twitterPropertyMightBeMissing);
});

var twitterPropertyMightBeMissing = function(author){
  const label = findLabel(author);
  const twitter = findTwitterUsername(author);
  const death = findDateOfDeath(author);
  if (label == null) {
    console.log('no label found'.orange, author.id);
    return false;
  }

  if (twitter) {
    console.log('twitter found'.green, author.id, label);
    return false;
  }

  if (death < twitterSuccess) {
    console.log("gone before twitter was created".grey, author.id, label);
    return false;
  }

  console.log('candidate'.blue, author.id, label);
  return true;
};
