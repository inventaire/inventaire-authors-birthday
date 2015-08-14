exec = require('child_process').exec

module.exports = ->
  cmd = "cd tomorrow-ui ; python -m SimpleHTTPServer & sleep 2 ; firefox http://localhost:8000"
  exec cmd, log

log = (error, stdout, stderr)->
  console.log 'stdout: ' + stdout
  console.log 'stderr: ' + stderr
  if error? then console.log 'exec error: ' + error