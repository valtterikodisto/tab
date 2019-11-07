const orderRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Order = require('../models/order')
const Customer = require('../models/customer')

orderRouter.get('/', adminOnly, async (request, response, next) => {
  try {
    const orders = await Order.find()
    response.send({ orders })
  } catch (error) {
    console.log(error)
  }
})

orderRouter.post('/', userOnly, async (request, response, next) => {
  try {
    const { customer, drinks, total } = request.body

    const savedCustomer = await Customer.findById(customer.id).populate('organization', 'maxTab')
    const order = new Order({
      date: Date.now(),
      customer: savedCustomer,
      drinks: drinks.map(drink => drink.id),
      total
    })

    const insufficientBalance = savedCustomer.balance - total < -savedCustomer.organization.maxTab

    if (insufficientBalance) {
      const error = new Error('Insufficient balance')
      error.name('InsufficientBalance')
      throw error
    }

    const savedOrder = await order.save()
    savedCustomer.orders = savedCustomer.orders.concat(savedOrder)
    savedCustomer.balance -= total
    await savedCustomer.save()
    response.send({ order: savedOrder })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = orderRouter
