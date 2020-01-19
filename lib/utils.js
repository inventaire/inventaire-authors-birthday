_ = require 'lodash'
loggers_ = require 'inv-loggers'

module.exports = _.extend _, loggers_,
  ErrorRethrow: (label)->
    errorRethrow = (err)->
      loggers_.error label, err
      throw err
