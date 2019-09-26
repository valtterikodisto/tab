const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  drinkAmounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DrinkAmount'
    }
  ],
  total: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'Total must be an integer'
    }
  }
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Order', orderSchema)
