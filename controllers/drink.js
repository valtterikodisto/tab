const drinkRouter = require('express').Router()
const { adminOnly, userOnly } = require('../utils/middleware')
const Drink = require('../models/drink')

drinkRouter.post('/', adminOnly, async (request, response, next) => {
  try {
    const { name, price, instructions } = request.body.drink
    const drink = new Drink({ name, price, selected: false, instructions: instructions || '' })

    const savedDrink = await drink.save()
    response.json({ drink: savedDrink })
  } catch (error) {
    next(error)
  }
})

drinkRouter.post('/search', adminOnly, async (request, response, next) => {
  try {
    const { search, exact } = request.body
    const name = exact ? search : new RegExp(search, 'i')
    const drinks = await Drink.find({ name })
    response.send({ drinks })
  } catch (error) {
    next(error)
  }
})

drinkRouter.get('/', adminOnly, async (request, response, next) => {
  try {
    const drinks = await Drink.find()
    response.json({ drinks })
  } catch (error) {
    next(error)
  }
})

drinkRouter.get('/selected', userOnly, async (request, response, next) => {
  try {
    const drinks = await Drink.find({ selected: true })
    response.json({ drinks })
  } catch (error) {
    next(error)
  }
})

drinkRouter.get('/page/:page', adminOnly, async (request, response, next) => {
  const page = request.params.page
  const limit = 10
  const skip = page * limit - limit

  try {
    const drinks = await Drink.find().setOptions({ skip, limit })
    const hasMore = drinks.length === limit
    response.send({ drinks, hasMore })
  } catch (error) {
    next(error)
  }
})

drinkRouter.put('/:id', adminOnly, async (request, response, next) => {
  try {
    const drink = request.body.drink
    const updatedDrink = await Drink.findByIdAndUpdate(request.params.id, drink, { new: true })
    response.send({ drink: updatedDrink })
  } catch (error) {
    next(error)
  }
})

drinkRouter.delete('/:id', adminOnly, async (request, response, next) => {
  try {
    await Drink.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = drinkRouter
