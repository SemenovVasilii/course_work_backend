const Router = require('express')
const router = new Router()
const usersController = require('../controller/usersController')

router.get('/getCurrentUser', usersController.getCurrentUser)
router.get('/getUser/:id', usersController.getUser)
router.put('/changeName', usersController.changeName)
router.put('/changeSurname', usersController.changeSurname)
router.put('/changePassword', usersController.changePassword)

module.exports = router