bluebird = require 'bluebird'
dataPath = process.cwd() + '/cache'

level = require 'level-party'
db = level dataPath, { encoding: 'json' }

get = bluebird.promisify db.get.bind(db)
set = bluebird.promisify db.put.bind(db)

module.exports = cache =
  get: (key, request)->
    get key
    .then (value)->
      return JSON.parse(value)
    .catch (err)->
      if err.notFound
        request()
        .then (res)-> cache.set key, res
        .catch (err)->
          console.error 'cache req err', err
          throw err
      else
        throw err

  set: (key, value)->
    set key, JSON.stringify(value)
    .then -> return value
