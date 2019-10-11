import React from 'react'

const Notification = ({ text, className, handleDelete }) => {
  if (!(className && (className.includes('is-warning') || className.includes('is-danger')))) {
    setTimeout(handleDelete, 5000)
  }

  return (
    <div className={`notification ${className}`}>
      <button className="delete" onClick={handleDelete}></button>
      {text}
    </div>
  )
}

export default Notification
