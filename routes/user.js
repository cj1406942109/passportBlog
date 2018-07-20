const express = require('express')
const router = express.Router()
const passport = require('passport')

require('../middlewares/passport')(passport)

const auth = require('../middlewares/authorization')

const userCtrl = require('../controllers/user')

router.get('/login', userCtrl.login)
router.get('/signup', userCtrl.signup)
router.get('/logout', userCtrl.logout)

// 创建账户
router.post('/create', userCtrl.create)

// 提交登录表单
router.post('/session', passport.authenticate('local', {
  // missing credential
  badRequestMessage: '用户名或密码不能为空',
  failureRedirect: '/user/login',
  failureFlash: true
}), userCtrl.session)

router.get('/profile/:userId', auth.requiresLogin, userCtrl.profile)
router.param('userId', userCtrl.load)

// 第三方登录
// router.get('/facebook')

module.exports = router
