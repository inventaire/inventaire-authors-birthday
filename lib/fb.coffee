CONFIG = require 'config'
fb = require 'fb'
Promise = require 'bluebird'

fb.options CONFIG.facebook

module.exports =
  api: Promise.promisify fb.napi, fb
  setAccessToken: (token)->
    console.log 'token'.cyan, token
    fb.setAccessToken token
    return token
  options: fb.options