schedule = require 'node-schedule'
require('colors').enabled = true

postAuthorsAtInterval = require './lib/post_authors_at_interval'
getAuthorsByBirthday = require './lib/get_authors_by_birthday'

initTodayGreetings = ->
  getAuthorsByBirthday 0
  .then postAuthorsAtInterval
  .catch (err)->
    console.log 'general err'.red, err.stack or err

time = {hour: 6, minute: 0}
console.log 'daily starting time'.green, time
schedule.scheduleJob time, initTodayGreetings

# just keeping the server alive node-schedule can't
alive = -> console.log 'alive!'.green
setInterval alive, 24*60*60*1000
