const orderRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Order = require('../models/order')
const Customer = require('../models/customer')
const Organization = require('../models/organization')
const Drink = require('../models/drink')
const mongoose = require('mongoose')

orderRouter.get('/', adminOnly, async (request, response, next) => {
  try {
    const orders = await Order.find()
    response.send({ orders })
  } catch (error) {
    console.log(error)
  }
})

orderRouter.get('/customer/:id/page/:page', adminOnly, async (request, response, next) => {
  try {
    const { id: customerId, page } = request.params
    const limit = 10
    const skip = page * limit - limit

    const customer = await Customer.findById(customerId)
    const orders = await Order.find({ customer })
      .sort({ date: -1 })
      .setOptions({ skip, limit })
      .populate('drinks')

    const hasMore = orders.length === limit
    response.send({ orders, hasMore })
  } catch (error) {
    next(error)
  }
})

orderRouter.post('/', userOnly, async (request, response, next) => {
  try {
    const { customer, deposit, drinks } = request.body
    const drinkTotal = await calculateDrinkTotal(drinks)
    const total = drinkTotal - deposit

    const savedCustomer = await Customer.findById(customer.id)
    const organization = await Organization.findById(customer.organization)
    const order = new Order({
      date: Date.now(),
      customer: savedCustomer,
      drinks: drinks.map(drink => drink.id),
      deposit,
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

const calculateDrinkTotal = async drinks => {
  const drinkIds = new Set()
  drinks.forEach(drink => drinkIds.add(mongoose.Types.ObjectId(drink.id)))

  const drinkList = await Drink.find({ _id: { $in: Array.from(drinkIds) } })
  const drinkTotal = drinks.reduce((prevSum, drink) => {
    const { price } = drinkList.find(d => {
      return d.id.toString() === drink.id
    })
    return prevSum + price
  }, 0)

  return drinkTotal
}

module.exports = orderRouter
