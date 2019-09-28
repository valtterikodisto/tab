import React, { useState } from 'react'
import Button from './Button'

const RegisterForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className="container register-form">
      <form
        onSubmit={event => {
          handleSubmit(event, username, password, setPassword, setPasswordConfirm)
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
            />
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
