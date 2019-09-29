import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import TemplatePage from './TemplatePage'
import RegisterForm from '../components/RegisterForm'
import userService from '../services/users'
import Notification from '../components/Notification'

const RegisterPage = ({ user, logout, history }) => {
  const [registerFormIsVisible, setRegisterFormIsVisible] = useState(true)
  const [notificationText, setNotificationText] = useState('')
  const [notificationClassName, setNotificationClassName] = useState('')

  const handleNotificationDelete = () => {
    setNotificationText('')
    setNotificationClassName('')
  }

  const handleRegister = async (
    event,
    username,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm
  ) => {
    event.preventDefault()
    setPassword('')
    setPasswordConfirm('')

    if (password !== passwordConfirm) {
      setNotificationText('Salasanat eivät täsmää')
      setNotificationClassName('is-warning')
      return
    } else if (!password) {
      setNotificationText('Salasana ei voi olla tyhjä')
      setNotificationClassName('is-warning')
      return
    } else if (username.length < 3) {
      setNotificationText('Käyttäjänimen tulee olla vähintään 3 merkkiä')
      setNotificationClassName('is-warning')
      return
    }

    try {
      const { user } = await userService.register(username, password)
      setRegisterFormIsVisible(false)
    } catch (error) {
      if (error.response.status === 409) {
        // Notify user
        setNotificationText('Käyttäjänimi on jo käytössä')
        setNotificationClassName('is-warning')
        console.log('Username already exists')
      } else {
        // Notify user
        setNotificationText('Käyttäjää ei voitu rekisteröidä')
        setNotificationClassName('is-danger')
        console.log('Could not register user')
      }
    }
  }

  const registerSection = () => {
    return (
      <>
        <div className="content" style={{ padding: '2em 0' }}>
          <h1 className="title is-3">Rekisteröi Tablist käyttäjä</h1>
          <p className="is-medium">
            Pääset käyttämään Tablistiä, kun rekisteröitymispyyntösi hyväksytään.
          </p>
        </div>
        <RegisterForm handleSubmit={handleRegister} />
      </>
    )
  }

  const successMessage = () => {
    return (
      <article className="message is-primary" style={{ padding: '5em 0' }}>
        <div className="message-header">
          <p>Rekisteröinti onnistui!</p>
        </div>
        <div className="message-body">
          Pääset kirjautumaan tilille{' '}
          <strong>kun ylläpitäjä on hyväksynyt rekisteröitymispyyntösi.</strong>
          <br />
          <br />
          <button className="button is-primary" onClick={() => history.push('/login')}>
            Kirjadu sisään
          </button>
        </div>
      </article>
    )
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
        {registerFormIsVisible ? registerSection() : successMessage()}
      </div>
    </TemplatePage>
  )
}

export default withRouter(RegisterPage)
