module.exports =
  db:
    unstable: false
    reloadDesignDocs: false
    protocol: 'http'
    host: 'localhost'
    port: 5984
    username: 'yourcouchdbusername'
    password: 'yourcouchdbpassword'
    auth: -> "#{@username}:#{@password}"
  twitter:
    # snake cased to be passed without reformating to the twit lib
    consumer_key: 'yourkey'
    consumer_secret: 'yourkey'
    access_token: 'yourkey'
    access_token_secret: 'yourkey'
