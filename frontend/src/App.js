import React, { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import 'bulma'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const tabListUserJSON = window.localStorage.getItem('tabListUser')
    if (tabListUserJSON) {
      setUser(JSON.parse(tabListUserJSON))
    }
  }, [])

  return (
    <div>
      <LoginPage setUser={setUser} />
    </div>
  )
}

export default App
