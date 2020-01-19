// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash');
const twit = require('./twit');
const { findLabel, findDescription, findPicture, findWikipediaData, findOfficialWebsite } = require('./wikidata_parser');
const Promise = require('bluebird');
const holmes = Promise.promisify(require('holmes'));
const breq = require('bluereq');

module.exports = candidates => Promise.all(candidates.map(searchTwitterAccount))
.then(dropAuthorsWithNoResults);

var searchTwitterAccount = function(author){
  const label = findLabel(author);
  return twit.getAsync('users/search', {
    q: escape(label),
    count: 6
  }).then(attachAccountsUrl)
  .then(parseResponse.bind(null, author, label));
};

var attachAccountsUrl = function(accounts){
  // accounts = res[0]
  if (_.isArray(accounts)) { return Promise.all(accounts.map(attachAccountUrl));
  } else {
    console.log('missing accounts', res);
    return Promise.resolve();
  }
};

var attachAccountUrl = function(account){
  const { url } = account;
  if (url == null) { return Promise.resolve(account); }
  // unshorten the url
  return holmes(account.url)
  .then(function(url){
    account.url = url;
    return account;
  });
};

var parseResponse = function(author, label, accounts){
  let candidate;
  author.label = findLabel(author);
  author.description = findDescription(author);
  author.picture = findPicture(author);
  author.website = findOfficialWebsite(author);
  return candidate = {
    author,
    accounts
  };
};

var dropAuthorsWithNoResults = candidates => candidates.filter(function(candidate){
  const test = candidate.accounts.length > 0;
  const { id, label } = candidate.author;
  if (test) { console.log('remaining candidate'.yellow, id, label);
  } else { console.log('no twitter account found'.grey, id, label); }
  return test;
});
