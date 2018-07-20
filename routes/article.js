const express = require('express')
const router = express.Router()

const articleCtrl = require('../controllers/article')

const auth = require('../middlewares/authorization')

router.get('/', articleCtrl.index)
router.get('/new', auth.requiresLogin, articleCtrl.new)


module.exports = router
