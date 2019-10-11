import React, { useState } from 'react'
import { centToEuro } from '../utils/centEuroConverter'
import Button from '../components/Button'
import ModalCard from './ModalCard'

const CustomerBox = ({ customer }) => {
  const [contactIsOpen, setContactIsOpen] = useState(false)

  const handleContactOpen = () => {
    setContactIsOpen(true)
  }

  const handleContactClose = () => {
    setContactIsOpen(false)
  }

  return (
    <div className="box">
      <div className="has-text-centered">
        <strong style={{ paddingRight: '5px' }}>
          {customer.firstname} {customer.lastname}
          {customer.yearOfBirth ? ` (${customer.yearOfBirth})` : ''}
        </strong>
        <small style={{ paddinLeft: '5px' }}>{customer.organization.name}</small>
      </div>
      <div className="has-text-centered" style={{ margin: '10px 0' }}>
        <strong className="title is-5">{centToEuro(customer.balance)}€</strong>
      </div>
      <div className="has-text-centered">
        <Button style={{ margin: '0 5px' }} text="Muokkaa" />
        <Button style={{ margin: '0 5px' }} text="Ostohistoria" />
        {customer.email ? (
          <Button style={{ margin: '0 5px' }} text="Ota yhteyttä" onClick={handleContactOpen} />
        ) : null}
      </div>

      <ModalCard
        visible={contactIsOpen}
        title={`${customer.firstname} ${customer.lastname}`}
        handleClose={handleContactClose}
      >
        <p>Ota yhteyttä: {customer.email}</p>
      </ModalCard>

      {customer.block < Date.now() ? (
        <div className="level">
          <div className="level-item has-text-centered">
            <strong>Estetty</strong>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CustomerBox
