import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../components/Navigation'

const TemplatePage = ({ children, user, logout }) => {
  const [menuActive, setMenuActive] = useState(false)
  const toggleMenu = () => setMenuActive(!menuActive)

  return (
    <>
      <Navigation menuActive={menuActive} toggleMenu={toggleMenu} user={user} logout={logout} />
      <main>{children}</main>
    </>
  )
}

TemplatePage.propTypes = {
  children: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired
}

export default TemplatePage
