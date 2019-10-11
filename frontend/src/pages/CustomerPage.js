import React, { useState, useEffect } from 'react'
import customerService from '../services/customers'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import Button from '../components/Button'
import CustomerBox from '../components/CustomerBox'

const CustomerPage = () => {
  const [customers, setCustomers] = useState()

  useEffect(() => {
    customerService
      .getAll()
      .then(c => setCustomers(c))
      .catch(e => console.log(e))
  }, [])

  return (
    <TemplatePage>
      <div className="container">{/* <CustomerBox customer={customer} /> */}</div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(CustomerPage)
