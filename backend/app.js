const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const { createAdmin } = require('./utils/admin')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Could not connect to MongoDB', error.message)
  })

createAdmin()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
