import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { deleteNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import Navigation from '../components/Navigation'
import Notification from '../components/Notification'

const TemplatePage = ({
  children,
  currentUser,
  setUser,
  notificationText,
  notificationClassName,
  deleteNotification,
  history
}) => {
  const [menuActive, setMenuActive] = useState(false)
  const toggleMenu = () => setMenuActive(!menuActive)

  const logout = () => {
    localStorage.removeItem('tabListUser')
    setUser(null)
    history.push('/login')
  }

  const handleNotificationDelete = () => {
    deleteNotification()
  }

  return (
    <>
      <Navigation
        menuActive={menuActive}
        toggleMenu={toggleMenu}
        currentUser={currentUser}
        logout={logout}
      />
      {notificationText ? (
        <Notification
          text={notificationText}
          className={notificationClassName}
          handleDelete={handleNotificationDelete}
        />
      ) : null}
      <main>{children}</main>
    </>
  )
}

TemplatePage.propTypes = {
  children: PropTypes.node.isRequired
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    notificationText: state.notification.text,
    notificationClassName: state.notification.className
  }
}

export default connect(
  mapStateToProps,
  { setUser, deleteNotification }
)(withRouter(TemplatePage))
