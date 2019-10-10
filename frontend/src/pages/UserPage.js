import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import TemplatePage from './TemplatePage'
import UserActivationTab from '../components/UserActivationTab'

const UserPage = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    userService
      .getAll()
      .then(u => setUsers(u))
      .catch(error => console.log(error.message))
  }, [])

  const handleAccept = (id, obj) => {
    const activatedUser = { ...obj, activated: true }
    userService.update(id, activatedUser).then(updatedUser => {
      setUsers(users.map(u => (u.id === id ? updatedUser : u)))
    })
  }

  const handleDelete = id => {
    userService.remove(id).then(() => setUsers(users.filter(u => u.id !== id)))
  }

  return (
    <TemplatePage>
      <div>
        {users ? (
          <UserActivationTab
            users={users}
            handleAccept={handleAccept}
            handleDelete={handleDelete}
          />
        ) : null}
      </div>
    </TemplatePage>
  )
}

export default UserPage
