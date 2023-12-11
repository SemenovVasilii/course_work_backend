const db = require('../db')

class driveController {
    async createDrive(req, res) {
        try {
            const { passenger_id, cost, departure, destination, description } = req.body
            const status = "open"
            const response = await db.query('INSERT INTO drive (passenger_id, cost, departure, destination, description, status) values ($1, $2, $3, $4, $5, $6) RETURNING *', [passenger_id, cost, departure, destination, description, status])
            res.json({ message: 'Поездка успешно добавлена!' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Ошибка создания поездки!' })
        }
    }

    async getDrives(req, res) {
        try {
            const status = "open"
            const response = await db.query('SELECT * from drive where status = $1', [status])
            res.json(response.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async updateDriveStatus(req, res) {
        try {
            const { id, status } = req.body
            const response = await db.query('UPDATE drive set status = $1 where id = $2 RETURNING *', [status, id])
            res.json({ message: 'Статус поездки изменен!' })
        } catch (e) {
            console.log(e)
        }
    }

    async addDriverId(req, res) {
        try {
            const { id, driver_id } = req.body
            const response = await db.query('UPDATE drive set driver_id = $1 where id = $2 RETURNING *', [driver_id, id])
            res.json({ message: 'Водитель добавлен!' })
        } catch (e) {
            console.log(e)
        }
    }

    async passengerCurrentDrive(req, res) {
        try {
            const { passenger_id } = req.headers
            const response = await db.query('SELECT * from drive where passenger_id = $1 ', [passenger_id])
            res.json(response.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async driverCurrentDrive(req, res) {
        try {
            const { driver_id } = req.headers
            const response = await db.query('SELECT * from drive where driver_id = $1 ', [driver_id])
            res.json(response.rows[0])
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new driveController()
