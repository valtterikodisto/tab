import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import LoginPage from './pages/LoginPage'
import FrontPage from './pages/FrontPage'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import 'bulma'
import RegisterPage from './pages/RegisterPage'

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
      </Router>
    </div>

    // <div>
    //   <Router>
    //     <Route
    //       exact
    //       path="/"
    //       render={() =>
    //         user ? <FrontPage user={user} logout={logout} /> : <Redirect to="/login" />
    //       }
    //     />
    //     <Route
    //       path="/login"
    //       render={() =>
    //         user ? <Redirect to="/" /> : <LoginPage user={user} setUser={setUser} logout={logout} />
    //       }
    //     />
    //     <Route
    //       path="/register"
    //       render={() => (user ? <Redirect to="/" /> : <RegisterPage user={user} logout={logout} />)}
    //     />
    //   </Router>
    // </div>
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
