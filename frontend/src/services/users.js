import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = '/api/users'

const register = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl, getHeader())
  return response.data.users
}

const update = async (id, user) => {
  const response = await axios.put(`${baseUrl}/${id}`, { user }, getHeader())
  return response.data.user
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getHeader())
  return response.data
}

const changePassword = async (id, oldPassword, newPassword) => {
  const response = await axios.put(
    `${baseUrl}/password/${id}`,
    { oldPassword, newPassword },
    getHeader()
  )
  return response.data
}

export default { register, getAll, update, changePassword, remove }
