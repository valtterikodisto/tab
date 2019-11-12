import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { centToEuro } from '../utils/centEuroConverter'
import Button from './Button'

const group = ord => _.values(_.groupBy(ord, 'id'))

function OrderHistory({ orders, loadMore, hasMore }) {
  const [groupedOrders, setGroupedOrders] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadMoreOrders()
  }, [])

  useEffect(() => {
    orders &&
      setGroupedOrders(
        orders.map(order => {
          const groupedOrder = { ...order, drinks: group(order.drinks) }
          return groupedOrder
        })
      )
  }, [orders])

  const loadMoreOrders = async () => {
    if (hasMore) {
      await loadMore(page)
      setPage(page + 1)
    }
  }

  const mapToRows = () => {
    return groupedOrders.map(order => {
      const date = new Date(order.date)

      return (
        <tr key={order.id}>
          <td>
            {order.drinks.map(drinkGroup => (
              <div key={`${order.id}-${drinkGroup[0].id}`}>
                {`${drinkGroup[0].name} (${drinkGroup.length}kpl)`}
                <br />
              </div>
            ))}
          </td>
          <td>{centToEuro(order.deposit)}€</td>
          <td>{centToEuro(order.total)}€</td>
          <td>{date.toLocaleTimeString('fi-FI', { dateStyle: 'full', timeStyle: 'short' })}</td>
        </tr>
      )
    })
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Juomat</th>
            <th>Talletus</th>
            <th>Yhteensä</th>
            <th>Päivämäärä</th>
          </tr>
        </thead>
        <tbody>{mapToRows()}</tbody>
      </table>
      {hasMore ? <Button text="Lataa lisää" onClick={loadMoreOrders} /> : null}
    </div>
  )
}

export default OrderHistory
