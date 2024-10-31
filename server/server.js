require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

app.use((req, res, next) => {
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/tasks', taskRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    }).catch(() => {
        console.log('connection to db failed.')
    })