import React from 'react'
import Button from './Button'
import { centToEuro } from '../utils/centEuroConverter'

const OrganizationBox = ({ organization, handleEdit }) => {
  return (
    <div className="box">
      <div className="content">
        <p>
          <strong>{organization.name}</strong>
        </p>
        <p>Maksimivelka: {centToEuro(organization.maxTab)}€</p>
      </div>
      <Button text="Muokkaa" onClick={() => handleEdit(organization)} className="is-primary" />
    </div>
  )
}

export default OrganizationBox
