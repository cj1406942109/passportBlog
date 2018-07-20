exports.requiresLogin = function(req, res, next) {
  // 已经登录
  if (req.isAuthenticated()) {
    return next()
  } else {
    if (req.method === 'GET') {
      req.session.returnTo = req.originalUrl
    }
    res.redirect('/user/login')
  }
}
