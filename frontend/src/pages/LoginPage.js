import React from 'react'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'

const LoginPage = ({ setUser }) => {
  const handleLogin = async (event, username, password, setPassword) => {
    event.preventDefault()
    setPassword('')

    try {
      const { token, user } = await loginService.login(username, password)
      const userWithToken = { ...user, token }

      window.localStorage.setItem('tabListUser', JSON.stringify(userWithToken))
      setUser(userWithToken)
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
    <>
      <LoginForm handleSubmit={handleLogin} />
    </>
  )
}

export default LoginPage
