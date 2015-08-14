Promise = require 'bluebird'
fs = Promise.promisifyAll require('fs')

module.exports = (candidates)->
  json = JSON.stringify candidates, null, 4
  fs.writeFileAsync './tomorrow-ui/tomorrow.json', json