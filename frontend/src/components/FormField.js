import React from 'react'

const FormField = ({ placeholder, attributes, error }) => {
  return (
    <>
      <input className="input" {...attributes} placeholder={placeholder} />
      <small style={{ fontWeight: 300, color: 'red' }}>{error || null}</small>
    </>
  )
}

export default FormField
