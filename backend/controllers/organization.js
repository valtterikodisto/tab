const organizationRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Organization = require('../models/organization')

organizationRouter.post('/', adminOnly, async (request, response, next) => {
  try {
    const name = request.body.name
    const maxTab = request.body.maxTab
    const organization = new Organization({ name, maxTab })

    const savedOrganization = await organization.save()
    response.json({ organization: savedOrganization })
  } catch (error) {
    next(error)
  }
})

organizationRouter.post('/search', async (request, response, next) => {
  try {
    const name = request.body.name
    const organization = await Organization.findOne({ name })
    response.json({ organization })
  } catch (error) {
    next(error)
  }
})

organizationRouter.get('/', userOnly, async (request, response, next) => {
  try {
    const organizations = await Organization.find().populate('customers')
    response.json({ organizations })
  } catch (error) {
    next(error)
  }
})

organizationRouter.put('/:id', adminOnly, async (request, response, next) => {
  try {
    const organization = request.body.organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      request.params.id,
      organization,
      { new: true }
    )
    response.send({ organization: updatedOrganization })
  } catch (error) {
    next(error)
  }
})

organizationRouter.delete('/:id', adminOnly, async (request, response, next) => {
  try {
    await Organization.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = organizationRouter
