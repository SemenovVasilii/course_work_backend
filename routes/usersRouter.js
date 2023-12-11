const Router = require('express')
const router = new Router()
const usersController = require('../controller/usersController')

router.get('/getCurrentUser', usersController.getCurrentUser)
router.get('/getUser/:id', usersController.getUser)

module.exports = router