import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { deleteNotification, setNotification } from '../reducers/notificationReducer'
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
  setNotification
}) => {
  const [menuActive, setMenuActive] = useState(false)
  const toggleMenu = () => setMenuActive(!menuActive)

  const logout = () => {
    localStorage.removeItem('tabListUser')
    setUser(null)
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
  { setUser, deleteNotification, setNotification }
)(TemplatePage)
