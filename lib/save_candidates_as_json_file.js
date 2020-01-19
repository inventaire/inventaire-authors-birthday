// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = function(candidates){
  const json = JSON.stringify(candidates, null, 4);
  return fs.writeFileAsync('./tomorrow-ui/tomorrow.json', json);
};