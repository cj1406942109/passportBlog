const User = require('../models/user')

exports.login = function (req, res) {
  // 已经登录过
  if (req.isAuthenticated()) {
    res.redirect('/')
  }
  res.render('user/login', {
    title: '用户登录',
    formTitle: '登录到我的账户',
    errors: req.flash('error')
  })
}

exports.signup = function (req, res) {
  res.render('user/signup', {
    title: '用户注册',
    formTitle: '注册新账号',
    errors: req.flash('error'),
    user: new User()
  })
}

exports.logout = function (req, res) {
  // 该方法由passport提供，调用该方法会移除req.user属性并清除登录会话（如果有）
  // http://www.passportjs.org/docs/logout/
  req.logout()
  res.redirect('/user/login')
}

// 此处考虑使用async ，yield
exports.create = function (req, res) {
  const user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      // 注册失败，重定向到注册页面，显示出错信息
      const errors = Object.keys(err.errors).map(field => err.errors[field].message)
      res.render('user/signup', {
        title: '用户注册',
        formTitle: '注册新账号',
        errors,
        user
      })
    } else {
      // 该方法由passport提供
      // http://www.passportjs.org/docs/login/
      req.login(user, err => {
        if (err) req.flash('error', '自动登录失败，请重试')
        // 登录成功，跳转到主页面
        return res.redirect('/')
      })
    }
  })
}

exports.session = function (req, res) {
  const returnTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(returnTo)
}

exports.load = function(req, res, next, id) {
  const criteria = { _id: id }
  const select = 'name username email'
  User.load({ criteria, select }, function(err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.profile = user
      next()
    } else {
      next(new Error('获取用户信息失败'))
    }
  })
}

exports.profile = function(req, res) {
  const user = req.profile
  res.render('user/profile', {
    title: '个人中心',
    user
  })
}
