import React, { useState, useEffect } from 'react'
import Autocomplete from './Autocomplete'
import { centToEuro } from '../utils/centEuroConverter'

const CustomerAutocomplete = ({ customers, customer, setCustomer }) => {
  const [customerOptions, setCustomerOptions] = useState(customers)
  console.log('customer', customer)

  useEffect(() => {
    setCustomerOptions(customers)
  }, [customers, customer])

  const mapOptionToValue = customer =>
    `${customer.firstname} ${customer.lastname}${yearToString(customer)}`
  const yearToString = customer => (customer.yearOfBirth ? ` ${customer.yearOfBirth}` : '')

  const generateInfo = () => {
    if (!customer) return null

    return <small>Tili: {centToEuro(customer.balance)}€</small>
  }

  const generateBlock = () => {
    if (!customer || !customer.block) return null
    return <p style={{ color: 'red' }}> Estetty</p>
  }

  return (
    <>
      <Autocomplete
        options={customerOptions}
        mapOptionToValue={mapOptionToValue}
        value={customer}
        setValue={setCustomer}
        placeholder="Asiakkaan etu- ja sukunimi"
      />
      {generateInfo()}
      {generateBlock()}
    </>
  )
}

export default CustomerAutocomplete
