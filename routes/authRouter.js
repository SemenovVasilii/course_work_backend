const Router = require('express')
const router = new Router()
const userController = require('../controller/authController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)

module.exports = router