import React from 'react'
import { withRouter } from 'react-router-dom'
import TemplatePage from './TemplatePage'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'

const LoginPage = ({ user, setUser, logout, history }) => {
  const handleLogin = async (event, username, password, setPassword) => {
    event.preventDefault()
    setPassword('')

    try {
      const { token, user } = await loginService.login(username, password)
      const userWithToken = { ...user, token }

      window.localStorage.setItem('tabListUser', JSON.stringify(userWithToken))
      setUser(userWithToken)
      history.push('/')
    } catch (error) {
      if (error.response.status === 403) {
        // Notify user
        console.log('Not activated')
      } else if (error.response.status === 401) {
        // Notify user
        console.log('Invalid username or password')
      }
    }
  }

  return (
    <TemplatePage user={user} logout={logout}>
      <LoginForm handleSubmit={handleLogin} />
    </TemplatePage>
  )
}

export default withRouter(LoginPage)
