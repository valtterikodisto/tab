const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  firstname: {
    type: String,
    minlength: 1,
    required: true
  },
  lastname: {
    type: String,
    minlength: 1,
    required: true
  },
  yearOfBirth: {
    type: Number,
    min: 1900,
    validate: {
      validator: Number.isInteger,
      message: 'Year of birth must be an integer and minimum of 1900'
    }
  },
  email: {
    type: String,
    validate: {
      validator: v => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return emailRegexp.test(v)
      },
      message: 'Invalid email address'
    }
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  block: {
    type: Date,
    validate: {
      validator: v => v > Date.now(),
      message: 'Block date must be at least 1 day'
    }
  },
  balance: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Balance must be an integer'
    }
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
})

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Customer', customerSchema)
