const customerRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Organization = require('../models/organization')
const Customer = require('../models/customer')

customerRouter.post('/', adminOnly, async (request, response, next) => {
  try {
    const { firstname, lastname, yearOfBirth, email, balance, organizationId } = request.body

    const organization = await Organization.findById(organizationId)
    const newCustomer = new Customer({
      firstname,
      lastname,
      yearOfBirth,
      email,
      balance: balance || 0,
      organization: organization.id
    })

    const savedCustomer = await newCustomer.save()
    organization.customers = organization.customers.concat(savedCustomer.id)
    await organization.save()
    response.send({ customer: savedCustomer })
  } catch (error) {
    next(error)
  }
})

customerRouter.get('/', userOnly, async (request, response, next) => {
  const customers = await Customer.find().populate('organization', 'name')
  response.send({ customers })
})

customerRouter.put('/:id', adminOnly, async (request, response, next) => {
  try {
    const customer = request.body.customer
    const updatedCustomer = await Organization.findByIdAndUpdate(request.params.id, customer, {
      new: true
    })
    response.send({ customer: updatedCustomer })
  } catch (error) {
    next(error)
  }
})

customerRouter.get('/page/:page', userOnly, async (request, response, next) => {
  const page = request.params.page
  const limit = 5
  const skip = page * limit - limit

  try {
    const customers = await Customer.find()
      .setOptions({ skip, limit })
      .populate('organization', 'name')
    const hasMore = customers.length === limit
    response.send({ customers, hasMore })
  } catch (error) {
    next(error)
  }
})

customerRouter.post('/search', userOnly, async (request, response, next) => {
  try {
    const search = request.body.search
    const keywords = search.split(/\s+/)
    const firstnameSearch = keywords.map(k => ({ firstname: new RegExp(k, 'i') }))
    const lastnameSearch = keywords.map(k => ({ lastname: new RegExp(k, 'i') }))
    const customers = await Customer.find({
      $or: [...firstnameSearch, ...lastnameSearch]
    }).populate('organization', 'name')

    response.send({ customers })
  } catch (error) {
    next(error)
  }
})

customerRouter.put('/block/:id', adminOnly, async (request, response, next) => {
  try {
    const id = request.params.id
    const date = request.body.date
    const customer = await Customer.findById(id)

    customer.block = date
    const blockedCustomer = await customer.save()
    response.send({ customer: blockedCustomer })
  } catch (error) {
    next(error)
  }
})

customerRouter.delete('/:id', adminOnly, async (request, response, next) => {
  try {
    await Customer.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = customerRouter
