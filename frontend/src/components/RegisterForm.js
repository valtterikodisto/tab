import React, { useState } from 'react'
import Button from './Button'

const RegisterForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const passwordsDiffer = passwordConfirm && passwordConfirm !== password

  return (
    <div className="container register-form">
      <form
        onSubmit={event => {
          handleSubmit(event, username, password, setPassword, passwordConfirm, setPasswordConfirm)
        }}
      >
        <div className="field">
          <div className="control">
            <label className="label">Käyttäjänimi</label>
            <input
              className="input"
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Salasana</label>
            <input
              className="input"
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Toista salasana</label>
            <input
              className="input"
              type="password"
              onChange={e => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              style={passwordsDiffer ? { border: '2px solid red' } : null}
            />
            {passwordsDiffer ? <small>Salasanat eivät täsmää</small> : null}
          </div>
        </div>
        <button className="button is-dark" type="submit">
          Rekisteröidy
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
