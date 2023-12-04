const Router = require('express')
const router = new Router()
const usersController = require('../controller/usersController')

router.get('/getUser', usersController.getUser)

module.exports = router