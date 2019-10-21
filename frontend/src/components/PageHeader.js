import React from 'react'
import Button from './Button'

const PageHeader = ({ title, buttonText, handleClick }) => {
  return (
    <div className="level" style={{ justifyContent: 'center', margin: '2em 0' }}>
      <h1 className="title has-text-centered" style={{ marginBottom: 0, marginRight: '10px' }}>
        {title}
      </h1>
      <Button style={{ marginLeft: '10px' }} text={buttonText} onClick={handleClick} />
    </div>
  )
}

export default PageHeader
