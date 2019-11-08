import React, { useState, useEffect } from 'react'
import { centToEuro } from '../utils/centEuroConverter'
import _ from 'lodash'

const group = ord => _.values(_.groupBy(ord, 'id'))
const style = { color: '#f2545b' }

function TotalBox({ order, total, insufficientBalance }) {
  const [groupedOrder, setGroupedOrder] = useState(group(order))
  useEffect(() => setGroupedOrder(group(order)), [order])

  const mapDrinksToTotal = () => {
    if (!groupedOrder || groupedOrder.length === 0) {
      return null
    }

    return (
      <div>
        {groupedOrder.map(drinks => {
          const name = Array.isArray(drinks) ? drinks[0].name : drinks.name
          const length = Array.isArray(drinks) ? drinks.length : drinks.length
          const price = Array.isArray(drinks) ? drinks[0].price : drinks.price
          const id = Array.isArray(drinks) ? drinks[0].id : drinks.id

          return (
            <p key={`total-${id}`}>
              {name} ({length}kpl): {centToEuro(price * length)}€
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="box">
      <p>
        <strong style={insufficientBalance() ? style : null}>Yhteensä: {centToEuro(total)}€</strong>
      </p>
      {mapDrinksToTotal()}
    </div>
  )
}

export default TotalBox
