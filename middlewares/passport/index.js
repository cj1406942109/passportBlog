const local = require('./local')
// const facebook = require('./facebook')
// const github = require('./github')
// const twitter = require('./twitter')
// const google = require('./google')
// const linkedin = require('./linkedin')

const User = require('../../models/user')


module.exports = function (passport) {
  // 序列化用户
  passport.serializeUser(function(user, done) {
    // 将user.id存到session中，req.session.passport.user = { id: '.....'}
    done(null, user.id)
  })
  passport.deserializeUser(function(id, done) {
    // 根据sessionn中的user.id到数据库获取user的信息，通过req.user访问
    User.load({ criteria: { _id: id } }, done)
  })

  // 使用以下策略(strategy)
  passport.use(local)
  // passport.use(facebook)
  // passport.use(github)
  // passport.use(twitter)
  // passport.use(google)
  // passport.use(linkedin)
}
