import React from 'react'

const UserBox = ({ user }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.username}</strong> <small>{user.admin ? 'admin' : 'user'}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default UserBox
