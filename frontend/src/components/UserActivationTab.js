import React, { useState } from 'react'
import UserActivationBox from './UserActivationBox'
import UserBox from './UserBox'

const UserActivationTab = ({ users, handleAccept, handleDelete }) => {
  const [userClassName, setUserClassName] = useState('is-active')
  const [requestsClassName, setRequestsClassName] = useState(null)

  const handleUser = () => {
    if (!userClassName) {
      setUserClassName('is-active')
      setRequestsClassName(null)
    }
  }

  const handleRequest = () => {
    if (!requestsClassName) {
      setRequestsClassName('is-active')
      setUserClassName(null)
    }
  }

  const activatedUsers = users.filter(user => user.activated)
  const mapUserToBox = () => activatedUsers.map(user => <UserBox user={user} key={user.id} />)

  const mapUserToActivationBox = () => {
    return users
      .filter(user => !user.activated)
      .map(user => (
        <UserActivationBox
          user={user}
          handleAccept={() => handleAccept(user.id, user)}
          handleDelete={() => handleDelete(user.id)}
          key={user.id}
        />
      ))
  }

  return (
    <div className="container">
      <div className="tabs is-centered">
        <ul>
          <li className={userClassName} onClick={handleUser}>
            <a>Käyttäjät</a>
          </li>
          <li className={requestsClassName} onClick={handleRequest}>
            <a>
              Pyynnöt
              <span
                style={{
                  margin: '0 5px',
                  padding: '0 5px',
                  background: '#8c5e58',
                  borderRadius: '5px',
                  color: 'white'
                }}
              >
                {users.length - activatedUsers.length}
              </span>
            </a>
          </li>
        </ul>
      </div>

      {userClassName ? mapUserToBox() : mapUserToActivationBox()}
    </div>
  )
}

export default UserActivationTab
