import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = 'http://localhost:3001/api/orders'

export const purchase = async (customer, total, drinks) => {
  const response = await axios.post(baseUrl, { customer, total, drinks }, getHeader())
  return response.data
}
