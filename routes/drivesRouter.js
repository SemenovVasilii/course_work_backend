const Router = require('express')
const router = new Router()
const drivesController = require('../controller/drivesController')

router.post('/createDrive', drivesController.createDrive)
router.get('/getDrives', drivesController.getDrives)
router.put('/updateDriveStatus', drivesController.updateDriveStatus)
router.put('/addDriverId', drivesController.addDriverId)
router.get('/passengerCurrentDrive', drivesController.passengerCurrentDrive)
router.get('/driverCurrentDrive', drivesController.driverCurrentDrive)

module.exports = router