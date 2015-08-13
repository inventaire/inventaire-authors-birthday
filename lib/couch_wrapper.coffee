CONFIG = require 'config'
couchWrapper = require 'inv-cot'

params =
  hostname: CONFIG.db.host
  port: CONFIG.db.port
  auth: CONFIG.db.auth()

if CONFIG.db.protocol is 'https'
  params.ssl = true

module.exports = couchWrapper params