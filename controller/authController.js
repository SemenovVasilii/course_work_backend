const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const { secret } = require('../config')

const generateAccessToken = (id) => {
    const payload = {
        id: id
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class AuthController {
    async registration(req, res) {
        try {
            const { name, surname, email, password, role } = req.body
            const candidate = await db.query('SELECT * FROM _user where email = $1', [email])
            if (candidate.rows.length != 0) {
                return res.status(400).json({ message: 'Пользователь с такой почтой уже зарегистрирован!' })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const newUser = await db.query('INSERT INTO _user (name, surname, email, password, role) values ($1, $2, $3, $4, $5) RETURNING *', [name, surname, email, hashPassword, role])
            res.json({ message: "Пользователь успешно зарегестрирован!" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка регистрации!" })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await db.query('SELECT * FROM _user where email = $1', [email])
            if (user.rows.length == 0) {
                return res.status(400).json({ message: `Пользователь с почтой ${email} не найден!` })
            }
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({ message: "Введен неверный пароль!" })
            }
            const token = generateAccessToken(user.rows[0].id)
            return res.json({ token })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ошибка авторизации!" })
        }
    }
}

module.exports = new AuthController()