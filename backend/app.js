const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const organizationRouter = require('./controllers/organization')
const customerRouter = require('./controllers/customers')
const drinkRouter = require('./controllers/drink')
const middleware = require('./utils/middleware')

const { createAdmin } = require('./utils/admin')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Could not connect to MongoDB', error.message)
  })

createAdmin()
  .then(admin => {
    console.log('Admin created')
  })
  .catch(e => {
    if (e.name === 'ValidationError') console.log('Admin has already been created')
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/organization', organizationRouter)
app.use('/api/customers', customerRouter)
app.use('/api/drinks', drinkRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
