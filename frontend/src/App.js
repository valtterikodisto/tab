import React, { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import FrontPage from './pages/FrontPage'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import 'bulma'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const tabListUserJSON = window.localStorage.getItem('tabListUser')
    if (tabListUserJSON) {
      setUser(JSON.parse(tabListUserJSON))
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('tabListUser')
  }

  return (
    <div>
      <Router>
        <Route
          exact
          path="/"
          render={() =>
            user ? <FrontPage user={user} logout={logout} /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/login"
          render={() =>
            user ? <Redirect to="/" /> : <LoginPage user={user} setUser={setUser} logout={logout} />
          }
        />
        <Route
          path="/register"
          render={() => (user ? <Redirect to="/" /> : <RegisterPage user={user} logout={logout} />)}
        />
      </Router>
    </div>
  )
}

export default App
