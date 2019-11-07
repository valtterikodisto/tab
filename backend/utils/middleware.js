const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.errors && error.errors.username && error.errors.username.kind === 'unique') {
    return response.status(409).json({ error: 'Username already taken' })
  } else if (error.errors && error.errors.name && error.errors.name.kind === 'unique') {
    return response.status(409).json({ error: 'Name already taken' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    })
  } else if (error.name === 'InsufficientBalance') {
    return response.status(403).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  const isValidAuthHeader = auth && auth.toUpperCase().startsWith('BEARER ')
  const token = isValidAuthHeader ? auth.substring(7) : null

  request.token = token
  next()
}

const adminOnly = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.PRIVATE)
    const user = await User.findById(decodedToken.id)
    if (!user || !user.admin) {
      throw new Error('User not authorized')
    }

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const userOnly = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.PRIVATE)

  try {
    const user = await User.findById(decodedToken.id)
    if (!user) {
      throw new Error('User not authorized')
    }

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, adminOnly, userOnly }
