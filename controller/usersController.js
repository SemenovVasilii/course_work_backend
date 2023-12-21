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

    async changeName(req, res) {
        try {
            const { id, name } = req.body
            const response = await db.query('UPDATE _user set name = $1 where id = $2 RETURNING *', [name, id])
            res.json({ message: 'Имя успешно изменено!' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка изменения!" })
        }
    }

    async changeSurname(req, res) {
        try {
            const { id, surname } = req.body
            const response = await db.query('UPDATE _user set surname = $1 where id = $2 RETURNING *', [surname, id])
            res.json({ message: 'Фамилия успешно изменена!' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка изменения!" })
        }
    }

    async changePassword(req, res) {
        try {
            const { id, password, newPassword } = req.body
            const user = await db.query('SELECT * FROM _user where id = $1', [id])
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({ message: "Введен неверный старый пароль!" })
            }
            const hashPassword = bcrypt.hashSync(newPassword, 7)
            const response = await db.query('UPDATE _user set password = $1 where id = $2 RETURNING *', [hashPassword, id])
            res.json({ message: "Пароль успешно изменен!" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка изменения!" })
        }
    }
}

module.exports = new usersController()