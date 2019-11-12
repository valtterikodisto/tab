const orderRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Order = require('../models/order')
const Customer = require('../models/customer')
const Organization = require('../models/organization')

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

    const savedCustomer = await Customer.findById(customer.id)
    const organization = await Organization.findById(customer.organization)
    const order = new Order({
      date: Date.now(),
      customer: savedCustomer,
      drinks: drinks.map(drink => drink.id),
      total
    })

    const insufficientBalance = savedCustomer.balance - total < -organization.maxTab

    if (insufficientBalance) {
      const error = new Error('Insufficient balance')
      error.name('InsufficientBalance')
      throw error
    }

    const savedOrder = await order.save()
    savedCustomer.orders = savedCustomer.orders.concat(savedOrder.id)
    savedCustomer.balance = savedCustomer.balance - total
    const c = await savedCustomer.save()
    response.send({ customer: c })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = orderRouter
