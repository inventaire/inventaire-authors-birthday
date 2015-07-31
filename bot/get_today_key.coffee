module.exports = ->
  today = new Date().toISOString().split('T')[0]
  [year, month, day] = today.split '-'
  return [day, month]