const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const drinkSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 1,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Price must be an integer'
    }
  },
  instructions: String
})

drinkSchema.plugin(uniqueValidator)
organizationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Drink', drinkSchema)
