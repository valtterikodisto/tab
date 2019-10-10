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

  const mapUserToBox = () =>
    users.filter(user => user.activated).map(user => <UserBox user={user} />)

  const mapUserToActivationBox = () => {
    return users
      .filter(user => !user.activated)
      .map(user => (
        <UserActivationBox
          user={user}
          handleAccept={() => handleAccept(user.id, user)}
          handleDelete={() => handleDelete(user.id)}
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
            <a>Pyynnöt</a>
          </li>
        </ul>
      </div>

      {userClassName ? mapUserToBox() : mapUserToActivationBox()}
    </div>
  )
}

export default UserActivationTab
