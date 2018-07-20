const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const router = require('./routes')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const favicon = require('serve-favicon')

const app = express()

// 数据库配置
require('./db/mongo')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// be sure to use session() before passport.session() to ensure that the login session is restored in the correct order.
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'my-passport-blog'
}))

// 初始化passport模块
app.use(passport.initialize())
app.use(passport.session())

// connect flash for flash messages - should be declared after sessions
app.use(flash())

// 启动路由
router(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
/* eslint-disable */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
/* eslint-enable */

module.exports = app
