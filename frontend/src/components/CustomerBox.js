import React, { useState } from 'react'
import { centToEuro } from '../utils/centEuroConverter'
import Button from '../components/Button'
import ModalCard from './ModalCard'
import OrderHistory from './OrderHistory'
import orderService from '../services/order'

const CustomerBox = ({ customer, handleEditOpen, handleBlock }) => {
  const [contactIsOpen, setContactIsOpen] = useState(false)

  // Customer orders state
  const [historyIsOpen, setHistoryIsOpen] = useState(false)
  const [hasMoreOrders, setHasMoreOrders] = useState(true)
  const [orders, setOrders] = useState([])

  const handleContactOpen = () => {
    setContactIsOpen(true)
  }

  const handleContactClose = () => {
    setContactIsOpen(false)
  }

  const handleHistoryOpen = () => {
    setHistoryIsOpen(true)
  }

  const handleHistoryClose = () => {
    setHistoryIsOpen(false)
  }

  const loadMoreHistory = async page => {
    console.log('LOADING...', page)
    orderService
      .getCustomerOrders(customer, page)
      .then(res => {
        setOrders(orders.concat(res.orders))
        setHasMoreOrders(res.hasMore)
      })
      .catch(e => console.log(e))
  }

  return (
    <div className="box">
      <div className="has-text-centered">
        {customer.block ? (
          <div className="level">
            <div className="level-item has-text-centered">
              <strong>Estetty</strong>
            </div>
          </div>
        ) : null}

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
        <Button
          style={{ margin: '0 5px' }}
          text="Muokkaa"
          onClick={() => handleEditOpen(customer)}
        />

        <Button style={{ margin: '0 5px' }} text="Ostohistoria" onClick={handleHistoryOpen} />
        {customer.email ? (
          <Button style={{ margin: '0 5px' }} text="Ota yhteyttä" onClick={handleContactOpen} />
        ) : null}

        {customer.block ? (
          <Button
            style={{ margin: '0 5px' }}
            text="Poista esto"
            className="is-success"
            onClick={() => handleBlock(customer.id)}
          />
        ) : (
          <Button
            style={{ margin: '0 5px' }}
            text="Estä"
            className="is-danger"
            onClick={() => handleBlock(customer.id)}
          />
        )}
      </div>

      <ModalCard
        visible={contactIsOpen}
        closeVisible={true}
        title={`${customer.firstname} ${customer.lastname}`}
        handleClose={handleContactClose}
      >
        <p>Ota yhteyttä: {customer.email}</p>
      </ModalCard>
      <ModalCard
        visible={historyIsOpen}
        closeVisible={true}
        title={`${customer.firstname} ${customer.lastname}: Ostokset`}
        handleClose={handleHistoryClose}
      >
        <OrderHistory orders={orders} loadMore={loadMoreHistory} hasMore={hasMoreOrders} />
      </ModalCard>
    </div>
  )
}

export default CustomerBox
