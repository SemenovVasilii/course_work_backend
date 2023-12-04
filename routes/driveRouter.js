const Router = require('express')
const router = new Router()
const driveController = require('../controller/driveController')

router.post('/createDrive', driveController.createDrive)

module.exports = router