import React from 'react'
import TemplatePage from './TemplatePage'

const FrontPage = ({ user, logout }) => {
  return (
    <TemplatePage user={user} logout={logout}>
      <p>Front page</p>
    </TemplatePage>
  )
}

export default FrontPage
