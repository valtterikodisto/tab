import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import TemplatePage from './TemplatePage'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'
import Notification from '../components/Notification'

const LoginPage = ({ user, setUser, logout, history }) => {
  const [notificationText, setNotificationText] = useState('')
  const [notificationClassName, setNotificationClassName] = useState('')

  const handleNotificationDelete = () => {
    setNotificationText('')
    setNotificationClassName('')
  }

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
        setNotificationText('Ylläpitäjä ei ole aktivoinut käyttäjää')
        setNotificationClassName('is-warning')
        console.log('Not activated')
      } else if (error.response.status === 401) {
        // Notify user
        setNotificationText('Käyttäjänimi tai salasana väärin')
        setNotificationClassName('is-danger')
        console.log('Invalid username or password')
      }
    }
  }

  return (
    <TemplatePage user={user} logout={logout}>
      <div className="container">
        {notificationText ? (
          <Notification
            text={notificationText}
            className={notificationClassName}
            handleDelete={handleNotificationDelete}
          />
        ) : null}
        <div className="content" style={{ padding: '2em 0' }}>
          <h1 className="title is-3 is-vcentered">Kirjaudu sisään Tablist-tunnuksilla</h1>
        </div>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    </TemplatePage>
  )
}

export default withRouter(LoginPage)
