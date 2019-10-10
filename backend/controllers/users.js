const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { adminOnly } = require('../utils/middleware')

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
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

userRouter.delete('/:id', adminOnly, async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter
