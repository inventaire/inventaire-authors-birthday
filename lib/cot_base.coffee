CONFIG = require 'config'
cot = require 'cot'
couch_ = require './couch'
_ = require 'lodash'

params =
  hostname: CONFIG.db.host
  port: CONFIG.db.port
  auth: CONFIG.db.auth()

if CONFIG.db.protocol is 'https'
  params.ssl = true

console.log 'CONFIG', CONFIG
console.log 'params', params

viewMethods = (designDocName)->
  viewCustom: (viewName, query)->
    @view(designDocName, viewName, query)
    .then couch_.mapDoc

  viewByKey: (viewName, key)->
    @viewCustom viewName,
      key: key
      include_docs: true

module.exports = (dbName, designDocName)->
  db = new cot(params).db(dbName)
  return _.extend db, viewMethods(designDocName)