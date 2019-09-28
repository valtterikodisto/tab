const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.errors && error.errors.username && error.errors.username.kind === 'unique') {
    return response.status(409).json({ error: 'Username already taken' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
