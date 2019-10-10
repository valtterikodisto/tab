import React from 'react'

const Button = ({ type, text, onClick, className }) => {
  const buttonType = type ? type : null
  const buttonClassName = className ? `button ${className}` : 'button is-primary'

  return (
    <>
      <button type={buttonType} className={buttonClassName} onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default Button
