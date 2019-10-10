import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import LoginPage from './pages/LoginPage'
import FrontPage from './pages/FrontPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import 'bulma'
import './App.scss'

const App = ({ currentUser, setUser }) => {
  useEffect(() => {
    const tabListUserJSON = window.localStorage.getItem('tabListUser')
    if (tabListUserJSON) {
      setUser(JSON.parse(tabListUserJSON))
    }
  }, [])

  return (
    <div>
      <Router>
        <Route
          exact
          path="/"
          render={() => (currentUser ? <FrontPage /> : <Redirect to="/login" />)}
        />
        <Route path="/login" render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)} />
        <Route
          path="/register"
          render={() => (currentUser ? <Redirect to="/" /> : <RegisterPage />)}
        />
        <Route path="/users" render={() => <UserPage />} />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(
  mapStateToProps,
  { setUser }
)(App)
