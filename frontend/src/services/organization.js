import axios from 'axios'
import getHeader from '../utils/authConfigHeader'
const baseUrl = '/api/organization'

const getAll = async () => {
  const response = await axios.get(baseUrl, getHeader())
  return response.data.organizations
}

const add = async (name, maxTab) => {
  const response = await axios.post(baseUrl, { name, maxTab }, getHeader())
  return response.data.organization
}

const update = async (id, organization) => {
  const response = await axios.put(`${baseUrl}/${id}`, { organization }, getHeader())
  return response.data.organization
}

const findByName = async name => {
  const response = await axios.post(`${baseUrl}/search`, { name }, getHeader())
  return response.data.organization
}

export default { getAll, add, update, findByName }
