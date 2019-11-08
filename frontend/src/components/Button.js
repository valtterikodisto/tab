import React from 'react'

const Button = ({ type, text, onClick, className, style, disabled }) => {
  const buttonType = type ? type : null
  const buttonClassName = className ? `button ${className}` : 'button is-primary'

  return (
    <>
      <button
        style={style}
        type={buttonType}
        className={buttonClassName}
        onClick={onClick}
        disabled={!!disabled}
      >
        {text}
      </button>
    </>
  )
}

export default Button
