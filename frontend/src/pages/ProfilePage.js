import React, { useState } from 'react'
import { connect } from 'react-redux'
import TemplatePage from './TemplatePage'
import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'
import Button from '../components/Button'

function ProfilePage({ currentUser, setNotification }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    userService
      .changePassword(currentUser.id, oldPassword, newPassword)
      .then(res => {
        console.log('Changed successfully')
        reset()
        setNotification('Salasana vaihdettu!', 'is-primary')
      })
      .catch(error => {
        console.log(error)
        reset()
        setNotification('Salasananvaihto epäonnistui', 'is-danger')
      })
  }

  const reset = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirm('')
  }

  const fieldStyle = { display: 'flex', justifyContent: 'center' }
  const notSame = confirm !== '' && newPassword !== confirm

  if (!currentUser) return null

  return (
    <TemplatePage>
      <div className="container has-text-centered">
        <h3 className="title is-3">Vaihda salasana</h3>
        <form onSubmit={handleSubmit}>
          <label>Vanha salasana</label>
          <div className="field has-addons" style={fieldStyle}>
            <div className="control">
              <input
                className="input"
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>
          </div>

          <label>Uusi salasana</label>
          <div className="field has-addons" style={fieldStyle}>
            <div className="control">
              <input
                className="input"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <label>Toista salasana</label>
          <div className="field has-addons" style={fieldStyle}>
            <div className="control">
              <input
                className="input"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
            </div>
          </div>
          {notSame ? <small style={{ color: 'red' }}>Salasanat eivät täsmää</small> : null}

          <Button text="Tallenna" type="submit" />
        </form>
      </div>
    </TemplatePage>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps,
  { setNotification }
)(ProfilePage)
