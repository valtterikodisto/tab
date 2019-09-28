import React from 'react'
import { withRouter } from 'react-router-dom'
import TemplatePage from './TemplatePage'
import RegisterForm from '../components/RegisterForm'
import userService from '../services/users'

const RegisterPage = ({ user, logout, history }) => {
  const handleRegister = async (event, username, password, setPassword, setPasswordConfirm) => {
    event.preventDefault()
    setPassword('')
    setPasswordConfirm('')

    try {
      const { user } = await userService.register(username, password)
      history.push('/login')
    } catch (error) {
      if (error.response.status === 409) {
        // Notify user
        console.log('Username already exists')
      } else {
        // Notify user
        console.log('Could not register user')
      }
    }
  }

  return (
    <TemplatePage user={user} logout={logout}>
      <RegisterForm handleSubmit={handleRegister} />
    </TemplatePage>
  )
}

export default withRouter(RegisterPage)
