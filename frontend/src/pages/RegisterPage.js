import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import RegisterForm from '../components/RegisterForm'
import userService from '../services/users'

const RegisterPage = ({ setNotification, history }) => {
  const [registerFormIsVisible, setRegisterFormIsVisible] = useState(true)

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
      setNotification('Salasanat eivät täsmää', 'is-warning')
      return
    } else if (!password) {
      setNotification('Salasana ei voi olla tyhjä', 'is-warning')
      return
    } else if (username.length < 3) {
      setNotification('Käyttäjänimen tulee olla vähintään 3 merkkiä', 'is-warning')
      return
    }

    try {
      const { user } = await userService.register(username, password)
      setRegisterFormIsVisible(false)
    } catch (error) {
      if (error.response.status === 409) {
        setNotification('Käyttäjänimi on jo käytössä', 'is-warning')
      } else {
        setNotification('Käyttäjää ei voitu rekisteröidä', 'is-danger')
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
    <TemplatePage>
      <div className="container">
        {registerFormIsVisible ? registerSection() : successMessage()}
      </div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(withRouter(RegisterPage))
