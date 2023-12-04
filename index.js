const express = require('express')
const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')
const driveRouter = require('./routes/driveRouter')
const cors = require('cors')
const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/drive', driveRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

