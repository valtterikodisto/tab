import React from 'react'
import Button from './Button'

const UserActivationBox = ({ user, handleDelete, handleAccept }) => {
  return (
    <div className="box is-centered">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.username}</strong> <small>{user.admin ? 'admin' : 'user'}</small>
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <Button text="Hyväksy" onClick={handleAccept} className="level-item is-primary" />
              <Button text="Hylkää" onClick={handleDelete} className="level-item is-danger" />
            </div>
          </nav>
        </div>
      </article>
    </div>
  )
}

export default UserActivationBox
