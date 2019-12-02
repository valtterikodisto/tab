const bcrypt = require('bcrypt')
const User = require('../models/user')

const defaultUsername = 'admin'
const defaultPassword = 'admin'

const createAdmin = async () => {
  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(defaultPassword, saltRounds)

  const admin = {
    username: defaultUsername,
    passwordHash,
    admin: true,
    activated: true
  }

  return new Promise((resolve, reject) => {
    User.create(admin)
      .then(a => resolve(a))
      .catch(e => reject(e))
  })
}

module.exports = { createAdmin, defaultUsername }
