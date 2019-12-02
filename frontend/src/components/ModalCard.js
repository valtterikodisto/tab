import React from 'react'

const ModalCard = ({ children, visible, closeVisible, title, handleClose }) => {
  const className = `modal${visible ? ' is-active' : ''}`

  return (
    <div className={className}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          {closeVisible ? (
            <button className="delete" onClick={handleClose} aria-label="close" />
          ) : null}
        </header>
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  )
}

export default ModalCard
