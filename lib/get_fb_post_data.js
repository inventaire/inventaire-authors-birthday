// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { findLabel, findDescription, findTwitterUsername } = require('./wikidata_parser');
const getAuthorsInventaireLink = require('./get_authors_inventaire_link');

const Promise = require('bluebird');

module.exports = function(author){
  const { id, picture } = author;
  const label = findLabel(author);
  const desc = findDescription(author);
  const url = getAuthorsInventaireLink(id);

  let text = `happy birthday ${label}!`;
  if (desc != null) { text += ` ${desc}`; }

  const data = {
    message: text,
    link: url,
    name: label
  };

  if (picture != null) { data.picture = picture; }

  return Promise.resolve(data);
};
