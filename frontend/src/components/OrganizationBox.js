import React from 'react'
import Button from './Button'
import { centToEuro } from '../utils/centEuroConverter'

const OrganizationBox = ({ organization, handleEdit }) => {
  return (
    <div className="box">
      <div className="content has-text-centered">
        <p>
          <strong>{organization.name}</strong>
        </p>
        <p>Maksimivelka: {centToEuro(organization.maxTab)}€</p>
      </div>
      <div className="has-text-centered">
        <Button text="Muokkaa" onClick={() => handleEdit(organization)} className="is-primary" />
      </div>
    </div>
  )
}

export default OrganizationBox
