const customerRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Organization = require('../models/organization')
const Customer = require('../models/customer')

customerRouter.post('/', adminOnly, async (request, response, next) => {
  try {
    const customer = request.body.customer
    const newCustomer = new Customer({ ...customer, balance: customer.balance || 0 })

    const customerOrganization = await Organization.findById(customer.organization)
    const savedCustomer = await newCustomer.save().catch(e => console.log(e))
    customerOrganization.customers = customerOrganization.customers.concat(savedCustomer.id)
    await customerOrganization.save()
    response.send({ customer: savedCustomer })
  } catch (error) {
    next(error)
  }
})

customerRouter.get('/', userOnly, async (request, response, next) => {
  const customers = await Customer.find().populate('organization', ['name', 'maxTab'])
  response.send({ customers })
})

customerRouter.put('/:id', adminOnly, async (request, response, next) => {
  try {
    const id = request.params.id
    const customer = request.body.customer
    const oldCustomer = await Customer.findById(id)

    const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
      new: true
    }).populate('organization', 'name')

    if (updatedCustomer.organization.id.toString() !== oldCustomer.organization.toString()) {
      const oldOrganization = await Organization.findById(oldCustomer.organization)
      oldOrganization.customers = oldOrganization.customers.filter(
        c => c.toString() !== oldCustomer.id.toString()
      )
      await oldOrganization.save()

      const newOrganization = await Organization.findById(updatedCustomer.organization)
      newOrganization.customers = newOrganization.customers.concat(id)
      await newOrganization.save()
    }

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

customerRouter.post('/block/:id', adminOnly, async (request, response, next) => {
  try {
    const id = request.params.id
    const customer = await Customer.findById(id).populate('organization', 'name')

    customer.block = !customer.block
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
