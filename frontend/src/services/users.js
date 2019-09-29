import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const register = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.users
}

export default { register, getAll }
