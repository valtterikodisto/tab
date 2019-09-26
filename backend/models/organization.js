const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    }
  ],
  // Maximum tab of a customer in this organization
  maxTab: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Maximum tab must be an integer'
    }
  }
})

organizationSchema.plugin(uniqueValidator)
organizationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Organization', organizationSchema)
