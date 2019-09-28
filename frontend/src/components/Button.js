import React from 'react'

const Button = ({ type, text, onClick }) => {
  const buttonType = type ? type : null

  return (
    <>
      <button type={buttonType} className="button is-dark" onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default Button
