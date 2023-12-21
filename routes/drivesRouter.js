const Router = require('express')
const router = new Router()
const drivesController = require('../controller/drivesController')

router.post('/createDrive', drivesController.createDrive)
router.get('/getDrives', drivesController.getDrives)
router.put('/updateDriverDriveStatus', drivesController.updateDriverDriveStatus)
router.put('/updatePassengerDriveStatus', drivesController.updatePassengerDriveStatus)
router.put('/addDriverId', drivesController.addDriverId)
router.get('/passengerCurrentDrive', drivesController.passengerCurrentDrive)
router.get('/driverCurrentDrive', drivesController.driverCurrentDrive)
router.get('/getDriverClosedDrives', drivesController.getDriverClosedDrives)
router.get('/getPassengerClosedDrives', drivesController.getPassengerClosedDrives)

module.exports = router