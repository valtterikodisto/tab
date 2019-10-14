import React from 'react'
import ModalCard from './ModalCard'
import Button from './Button'

const CustomerDeleteBox = ({ customer, handleSubmit, handleClose }) => {
  const handleFormSubmit = event => {
    event.preventDefault()
    handleSubmit(customer)
  }

  return customer ? (
    <ModalCard handleClose={handleClose} visible={true} title="Asiakkaan poisto">
      <p>
        Olet poistamassa asiakasta <strong>{`${customer.firstname} ${customer.lastname}`}</strong>
      </p>
      <p>
        Poistaessasi asiakkaan, kaikki asiakkaaseen liittyvä tieto (ml. ostoshistoria){' '}
        <strong>poistetaan pysyvästi</strong>
      </p>
      <br />

      <strong>Poistetaanko asiakas?</strong>
      <form onSubmit={handleFormSubmit}>
        <Button
          style={{ marginRight: '5px' }}
          type="submit"
          className="is-danger"
          text="Poista asiakas"
        />
        <div style={{ marginLeft: '5px' }} className="button" onClick={handleClose}>
          Peruuta
        </div>
      </form>
    </ModalCard>
  ) : null
}

export default CustomerDeleteBox
