const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)
const chalk = require('chalk')

let uri = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

mongoose.connect(uri, { useNewUrlParser: true })

// mongoose 自带的Promise不提供catch，使用全局promise替换
// 或者使用其他Promise库
// mongoose.Promise = require('bluebird')

// 参考文档：http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
  console.log(chalk.green(`数据库成功连接到：${config.db.host}:${config.db.port}/${config.db.name}`))
})

db.on('error', (err) => {
  console.error(chalk.red(`数据库连接出错！错误信息：\n${err}`))
  mongoose.disconnect()
})

db.on('close', () => {
  console.log(chalk.yellow('数据库断开，重新连接数据库...'))
  mongoose.connect(uri, { server: { auto_reconnect: true } })
})

module.exports = db
