const db = require('../db')

class driveController {
    async createDrive(req, res) {
        try {
            const { passenger_id, cost, departure, destination, description } = req.body
            const response = await db.query('INSERT INTO drive (passenger_id, cost, departure, destination, description) values ($1, $2, $3, $4, $5) RETURNING *', [passenger_id, cost, departure, destination, description])
            res.json({ message: 'Поездка успешно добавлена!' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Ошибка создания поездки!' })
        }
    }
}

module.exports = new driveController()
