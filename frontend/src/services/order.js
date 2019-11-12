import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = 'http://localhost:3001/api/orders'

const purchase = async (customer, deposit, drinks) => {
  const response = await axios.post(baseUrl, { customer, deposit, drinks }, getHeader())
  return response.data
}

const getCustomerOrders = async (customer, page) => {
  const response = await axios.get(`${baseUrl}/customer/${customer.id}/page/${page}`, getHeader())
  return response.data
}

export default { purchase, getCustomerOrders }
