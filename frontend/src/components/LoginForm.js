import React, { useState } from 'react'
import Button from './Button'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="container login-form">
      <form
        onSubmit={event => {
          handleSubmit(event, username, password, setPassword)
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
        <Button type="submit" text="Kirjaudu" />
      </form>
    </div>
  )
}

export default LoginForm
