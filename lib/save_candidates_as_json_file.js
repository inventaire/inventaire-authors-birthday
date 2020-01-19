const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

module.exports = function (candidates) {
  const json = JSON.stringify(candidates, null, 4)
  return fs.writeFileAsync('./tomorrow-ui/tomorrow.json', json)
}
