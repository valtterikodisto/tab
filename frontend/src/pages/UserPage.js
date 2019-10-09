import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import TemplatePage from './TemplatePage'

const UserPage = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    userService
      .getAll()
      .then(u => setUsers(u))
      .catch(error => console.log(error.message))
  }, [])

  const mapUserToUserBox = () => {
    console.log(users)
    if (!users) {
      return null
    }

    return users.map(user => <div key={user.id}>{user.username}</div>)
  }

  return (
    <TemplatePage>
      <div>{mapUserToUserBox()}</div>
    </TemplatePage>
  )
}

export default UserPage
