const bcrypt = require('bcrypt')
const User = require('../models/user')

const createAdmin = async () => {
  const defaultUsername = 'admin'
  const defaultPassword = 'admin'

  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(defaultPassword, saltRounds)

  const admin = {
    username: defaultUsername,
    passwordHash,
    admin: true,
    activated: true
  }

  User.create(admin)
    .then('Admin has been created')
    .catch(e => console.log('Admin already exists'))
}

module.exports = { createAdmin }
