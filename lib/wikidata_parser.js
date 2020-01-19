// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let wdParsers;
const _ = require('lodash');
const wdk = require('wikidata-sdk');

module.exports = (wdParsers = {
  findLabel(author){ return findBestValue(author.labels); },
  findDescription(author){ return findBestValue(author.descriptions); },
  findPicture(author){
    let file = findFirstProperty('P18', author);
    if (file) {
      file = escape(file);
      return `https://commons.wikimedia.org/w/thumb.php?width=200&f=${file}`;
    }
  }
});

var findBestValue = function(obj){
  if (obj == null) { return; }

  const { en, fr, de, es, it, se, nl } = obj;
  const prioriatryValue = _.compact([ en, fr, de, es, it, se, nl ])[0];
  if (prioriatryValue != null) { return prioriatryValue.value;
  } else {
    for (let lang in obj) {
      // should return the first found
      obj = obj[lang];
      return obj.value;
    }
  }
};

const findProperty = function(property, author){
  const claims = wdk.simplifyClaims(author.claims);
  return claims[property];
};

var findFirstProperty = (property, author) => __guard__(findProperty(property, author), x => x[0]);

_.extend(wdParsers, {
  findTwitterUsername: findFirstProperty.bind(null, 'P2002'),
  findDateOfDeath: findFirstProperty.bind(null, 'P570'),
  findOfficialWebsite: findFirstProperty.bind(null, 'P856')
}
);

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}