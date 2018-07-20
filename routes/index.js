const user = require('./user')
const article = require('./article')

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.redirect('/article')
  })

  app.get('/session', (req, res) => {
    res.json(req.user)
  })

  app.use('/user', user)
  app.use('/article', article)
}
