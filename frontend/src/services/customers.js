import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = 'http://localhost:3001/api/customers'

const getAll = async () => {
  const response = await axios.get(baseUrl, getHeader())
  return response.data.customers
}

const getPage = async page => {
  const response = await axios.get(`${baseUrl}/page/${page}`, getHeader())
  return response.data
}

const add = async (firstname, lastname, yearOfBirth, email, balance, organizationId) => {
  const customer = { firstname, lastname, yearOfBirth, email, balance, organizationId }
  const response = await axios.post(baseUrl, customer, getHeader())
  return response.data.customer
}

const update = async (id, customer) => {
  const response = await axios.put(`${baseUrl}/${id}`, { customer }, getHeader())
  return response.data.customer
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getHeader())
  return response.data
}

const block = async id => {
  const response = await axios.put(`${baseUrl}/${id}`, null, getHeader())
  return response.data.customer
}

const search = async search => {
  const response = await axios.post(`${baseUrl}/search`, { search }, getHeader())
  return response.data.customers
}

export default { getAll, getPage, add, update, remove, block, search }
