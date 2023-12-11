const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const { secret } = require('../config')

class usersController {
    async getCurrentUser(req, res) {
        try {
            const token = req.headers.authorization.slice(7, req.headers.authorization.length)
            const data = jwt.decode(token)
            const id = data.id
            const response = await db.query('SELECT * from _user where id = $1', [id])
            res.json(response.rows[0])
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка получения!" })
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id
            const response = await db.query('SELECT * from _user where id = $1', [id])
            res.json(response.rows[0])
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка получения!" })
        }
    }

}

module.exports = new usersController()