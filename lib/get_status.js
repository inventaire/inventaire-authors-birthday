/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { findLabel, findDescription, findTwitterUsername } = require('./wikidata_parser');
const getAuthorsInventaireLink = require('./get_authors_inventaire_link');

// depends on twitter config, might evolve
const shortLinkLength = 24;
// removing one character to keep it for a space before the url
const textMaxLength = 140  - 1 - shortLinkLength;


module.exports = function(author){
  // console.log 'author', author
  const { id } = author;
  const label = findLabel(author);
  const twitterUsername = findTwitterUsername(author);
  const desc = findDescription(author);
  const url = getAuthorsInventaireLink(id);

  let text = `happy birthday ${label}`;
  if (twitterUsername != null) { text += ` @${twitterUsername}`; }
  text += '!';
  if (desc != null) { text += ` ${desc}`; }

  return text.slice(0, +textMaxLength + 1 || undefined) + ' ' + url;
};
