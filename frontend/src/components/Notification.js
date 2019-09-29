import React from 'react'

const Notification = ({ text, className, handleDelete }) => {
  return (
    <div className={`notification ${className}`}>
      <button className="delete" onClick={handleDelete}></button>
      {text}
    </div>
  )
}

export default Notification
