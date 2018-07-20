const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/user')

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  const options = {
    criteria: { email: email },
    select: 'name username email hashedPassword salt'
  }
  User.load(options, function(err, user) {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: '用户不存在' })
    }
    if (!user.authenticate(password)) {
      return done(null, false, { message: '用户名或密码错误' })
    }
    return done(null, user)
  })
})
