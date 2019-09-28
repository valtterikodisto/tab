import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ menuActive, toggleMenu, user, logout }) => {
  const navbarAttribute = menuActive ? ' is-active' : ''

  const navbarStart = () => {
    if (user) {
      return (
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Etusivu
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="/">
              Asiakkaat
            </Link>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/">
                Asiakaslista
              </Link>
              <Link className="navbar-item" to="/">
                Lisää asiakas
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="/">
              Järjestöt
            </Link>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/">
                Järjestölista
              </Link>
              <Link className="navbar-item" to="/">
                Lisää järjestö
              </Link>
            </div>
          </div>

          <Link className="navbar-item" to="/">
            Hinnasto
          </Link>

          <Link className="navbar-item" to="/">
            Käyttäjät
          </Link>
        </div>
      )
    }
  }

  const navbarEnd = () => {
    if (!user) {
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
                <strong>{user.username}</strong>
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
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Tab list logo"
          />
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
