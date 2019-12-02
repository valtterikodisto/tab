import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = '/api/drinks'

const getAll = async () => {
  const response = await axios.get(baseUrl, getHeader())
  return response.data.drinks
}

const getPage = async page => {
  const response = await axios.get(`${baseUrl}/page/${page}`, getHeader())
  return response.data // Drinks & hasMore
}

const getSelected = async () => {
  const response = await axios.get(`${baseUrl}/selected`, getHeader())
  return response.data.drinks
}

const add = async drink => {
  const response = await axios.post(baseUrl, { drink }, getHeader())
  return response.data.drink
}

const update = async (id, drink) => {
  const response = await axios.put(`${baseUrl}/${id}`, { drink }, getHeader())
  return response.data.drink
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getHeader())
  return response.data
}

const search = async search => {
  const response = await axios.post(`${baseUrl}/search`, { search }, getHeader())
  return response.data.drinks
}

const checkIfExists = async name => {
  const response = await axios.post(`${baseUrl}/search`, { search: name, exact: true }, getHeader())
  return response.data.drinks && response.data.drinks.length > 0
}

const select = async (id, drink) => {
  const updatedDrink = await update(id, { ...drink, selected: !drink.selected })
  return updatedDrink
}

export default { getAll, getPage, getSelected, add, update, remove, search, checkIfExists, select }
