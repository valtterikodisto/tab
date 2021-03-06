const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  if (!user.activated) {
    return response.status(403).json({ error: 'User is not activated' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.PRIVATE)
  response.status(200).send({ token, user })
})

module.exports = loginRouter
