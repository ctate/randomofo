module.exports = (app) ->
  
  # GET /
  app.get '/', (req, res) ->
    res.render 'index', {
      title: 'randomofo - randomizer for veganmofo.com'
    }
