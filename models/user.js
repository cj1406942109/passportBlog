const mongoose = require('mongoose')
const crypto = require('crypto')

const Schema = mongoose.Schema

const oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
]

const UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    default: ''
  },
  hashedPassword: {
    type: String,
    default: ''
  },
  salt: {
    type: String,
    default: ''
  },
  authToken: {
    type: String,
    default: ''
  },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
})

UserSchema.virtual('password').set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashedPassword = this.encryptPwd(password)
}).get(function () {
  return this._password
})

// validation
UserSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true
  return name.length
}, '昵称不能为空')

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true
  return email.length
}, '邮箱不能为空')

// 参见：http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
// Passing a validator function that receives two arguments tells mongoose that the validator is an asynchronous validator. The first argument passed to the validator function is the value being validated. The second argument is a callback function that must called when you finish validating the value and passed either true or false to communicate either success or failure respectively.
UserSchema.path('email').validate({
  isAsync: true,
  validator: function (email, respond) {
    const User = mongoose.model('User')
    // 验证成功
    if (this.skipValidation()) respond(true)
    // 异步验证
    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
      User.find({ email: email }).exec(function (err, users) {
        respond(!err && users.length === 0)
      })
    } else respond(true)
  },
  message: '该邮箱已被注册'
})

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true
  return username.length
}, '用户名不能为空')

UserSchema.path('hashedPassword').validate(function (hashedPassword) {
  if (this.skipValidation()) return true
  return hashedPassword.length && this._password.length
}, '密码不能为空')


UserSchema.pre('save', function (next) {
  if (!this.isNew) return next()

  // 使用密码，且密码为空或者长度为0，则报错
  if (!this.skipValidation() && !this.validatePresenceOf(this.password)) {
    next(new Error('密码不合法'))
  } else {
    next()
  }
})

UserSchema.methods = {
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },
  encryptPwd: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  authenticate: function (plainText) {
    return this.encryptPwd(plainText) === this.hashedPassword
  },
  skipValidation: function () {
    return oAuthTypes.indexOf(this.provider) >= 0
  },
  validatePresenceOf: function (value) {
    return value && value.length
  }
}

UserSchema.statics = {
  load: function (options, callback) {
    options.select = options.select || 'name username'
    return this.findOne(options.criteria).select(options.select).exec(callback)
  }
}

module.exports = mongoose.model('User', UserSchema)
