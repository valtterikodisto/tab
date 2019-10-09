import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = 'http://localhost:3001/api/users'

const register = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl, getHeader())
  return response.data.users
}

export default { register, getAll }
