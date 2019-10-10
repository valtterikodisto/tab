import React, { ReactCom } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../images/logo.svg'

const Navigation = ({ menuActive, toggleMenu, currentUser, logout }) => {
  const navbarAttribute = menuActive ? ' is-active' : ''

  const navbarStart = () => {
    if (currentUser) {
      return (
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Etusivu
          </Link>

          <Link className="navbar-item" to="/customers">
            Asiakkaat
          </Link>

          <Link className="navbar-item" to="/organizations">
            Järjestöt
          </Link>

          <Link className="navbar-item" to="/catalog">
            Hinnasto
          </Link>

          <Link className="navbar-item" to="/users">
            Käyttäjät
          </Link>
        </div>
      )
    }
  }

  const navbarEnd = () => {
    if (!currentUser) {
      return (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/register">
                <strong>Rekisteröidy</strong>
              </Link>
              <Link className="button is-light" to="/login">
                Kirjaudu sisään
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <div className="button is-dark">
                <strong>{currentUser.username}</strong>
              </div>
              <button className="button is-light" onClick={logout}>
                Kirjaudu ulos
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Logo width="100" height="62" alt="Tab list logo" />
        </div>

        <div
          role="button"
          className={`navbar-burger burger${navbarAttribute}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarBasic" className={`navbar-menu${navbarAttribute}`}>
        {navbarStart()}
        {navbarEnd()}
      </div>
    </nav>
  )
}

export default Navigation
