import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import TemplatePage from './TemplatePage'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'

const LoginPage = ({ setUser, setNotification, history }) => {
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
        setNotification('Ylläpitäjä ei ole aktivoinut käyttäjää', 'is-warning')
      } else if (error.response.status === 401) {
        setNotification('Käyttäjänimi tai salasana väärin', 'is-danger')
      }
    }
  }

  return (
    <TemplatePage>
      <div className="container">
        <div className="content" style={{ padding: '2em 0' }}>
          <h1 className="title is-3 is-vcentered">Kirjaudu sisään Tablist-tunnuksilla</h1>
        </div>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setUser, setNotification }
)(withRouter(LoginPage))
