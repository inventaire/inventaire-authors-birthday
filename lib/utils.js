// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash');
const loggers_ = require('inv-loggers');

module.exports = _.extend(_, loggers_, {
  ErrorRethrow(label){
    let errorRethrow;
    return errorRethrow = function(err){
      loggers_.error(label, err);
      throw err;
    };
  }
}
);
