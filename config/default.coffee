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
    consumer_key: 'customize'
    consumer_secret: 'customize'
    access_token: 'customize'
    access_token_secret: 'customize'
  facebook:
    longLivedToken: 'customize'
    pageId: 'customize'
