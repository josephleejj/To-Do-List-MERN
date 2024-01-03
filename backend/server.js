// for .env file
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const toDoRoutes = require('./routes/toDoRoute')

// creating the app
const app = express()

// use to deconstruct req.body to parse json document
app.use(express.json())

// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// })

// register todo routes
app.use('/api/todos', toDoRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port')
        })
    })
    .catch((error) => {
        console.log(error)
    })




