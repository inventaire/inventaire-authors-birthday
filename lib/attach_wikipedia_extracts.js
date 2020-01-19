// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Promise = require('bluebird');
const breq = require('bluereq');
const _ = require('lodash');

module.exports = candidates => Promise.all(candidates.map(attachWikipediaExtract));

var attachWikipediaExtract = function(candidate){
  let title = __guard__(candidate.author.sitelinks != null ? candidate.author.sitelinks.enwiki : undefined, x => x.title);
  if (title != null) {
    title = escape(title);
    return breq.get(`https://inventaire.io/api/data/public?api=wp-extract&lang=en&title=${title}`)
    .then(_.property('body.extract'))
    .then(function(extract){
      candidate.author.extract = extract;
      candidate.author.wikipedia = `https://en.wikipedia.org/wiki/${title}`;
      return candidate;
    });
  } else {
    return Promise.resolve(candidate);
  }
};
function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}