const jwt = require('jsonwebtoken')
const { secret } = require("../config")

module.exports = function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
    } catch (error) {
        console.log(error)
        res.status(403).json({ message: "Пользователь не авторизован" })
    }
}