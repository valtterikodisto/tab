const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('../models/user')
const { adminOnly, userOnly } = require('../utils/middleware')

const saltRounds = 10

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

userRouter.get('/', adminOnly, async (request, response) => {
  const users = await User.find()
  response.json({ users })
})

userRouter.put('/:id', adminOnly, async (request, response, next) => {
  try {
    const user = request.body.user
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.send({ user: updatedUser })
  } catch (error) {
    next(error)
  }
})

userRouter.put('/password/:id', userOnly, async (request, response) => {
  try {
    const { oldPassword, newPassword } = request.body
    const user = await User.findById(request.params.id)

    const oldPasswordCorrect =
      user === null ? false : await bcrypt.compare(oldPassword, user.passwordHash)

    if (!oldPasswordCorrect) {
      return response.status(401).json({ error: 'Could not change password' })
    }

    const passwordHash = await bcrypt.hash(newPassword, saltRounds)
    user.passwordHash = passwordHash

    await user.save()
    response.status(204).send()
  } catch (error) {
    next(error)
  }
})

userRouter.delete('/:id', adminOnly, async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter
