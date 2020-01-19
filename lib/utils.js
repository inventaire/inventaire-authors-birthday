const _ = require('lodash')
const loggers_ = require('inv-loggers')

module.exports = _.extend(_, loggers_, {
  ErrorRethrow (label) {
    let errorRethrow
    return errorRethrow = function (err) {
      loggers_.error(label, err)
      throw err
    }
  }
}
)
