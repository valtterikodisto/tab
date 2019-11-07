import React, { useState } from 'react'
import useField from '../hooks/useField'

const OrderForm = () => {
  const { firstnameError, set: setFirstname, ...firstname } = useField('text')
  const { lastnameError, set: setLastname, ...lastname } = useField('text')
  const { deposit, set: setDeposit, ...deposit } = useField('text')
  const [drinks, setDrinks] = useState([])
  const [total, setTotal] = useState(0)

  const onSubmit = event => {
    event.preventDefault()
  }

  return <form onSubmit={onSubmit}></form>
}

export default OrderForm
