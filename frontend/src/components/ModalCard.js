import React from 'react'

const ModalCard = ({ children, visible, footerVisible, title, submitText, handleClose }) => {
  const className = `modal${visible ? ' is-active' : ''}`

  return (
    <div className={className}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={handleClose} aria-label="close" />
        </header>
        <section className="modal-card-body">{children}</section>
        {footerVisible ? (
          <footer className="modal-card-foot">
            <button className="button is-primary">{submitText}</button>
            <button className="button" onClick={handleClose}>
              Peruuta
            </button>
          </footer>
        ) : null}
      </div>
    </div>
  )
}

export default ModalCard
