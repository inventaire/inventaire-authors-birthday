module.exports = (time)->
  console.log 'time', time
  day = if time? then new Date(time) else new Date()
  console.log 'day', day
  today = day.toISOString().split('T')[0]
  console.log 'today', today
  [year, month, day] = today.split '-'
  return [day, month]