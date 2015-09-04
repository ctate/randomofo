# load modules
body          = require 'body-parser'
cookie        = require 'cookie-parser'
express       = require 'express'
path          = require 'path'

# create app
app = express()
port = 3000

# set app title
title = 'Crystal - Open Source Code Generator for Every Language and Platform'

# disable app settings
app.disable 'etag'

# setup views
app.set 'views', path.join(__dirname, 'views')

# setup jade
app.set 'view engine', 'jade'

# setup static dirs
app.use '/components', express.static("#{__dirname}/public/components")
app.use '/data', express.static("#{__dirname}/public/data")
app.use '/images', express.static("#{__dirname}/public/images")
app.use '/javascripts', express.static("#{__dirname}/public/javascripts")
app.use '/stylesheets', express.static("#{__dirname}/public/stylesheets")

# setup middleware
app.use body.urlencoded { extended: true }
app.use body.json()
app.use cookie()
process.on 'uncaughtException', (err) ->
  switch err.code
    when 'EADDRINUSE'
      console.log "Port #{port} is already in use."
    else
      console.log err.message

# load routes
require('./routes/home')(app)

# serve app
console.log 'Serving...'
app.listen port
