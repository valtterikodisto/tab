import React from 'react'
import { centToEuro } from '../utils/centEuroConverter'
import Button from '../components/Button'

const DrinkBox = ({ drink, handleEditOpen, handleSelect }) => {
  return (
    <div className="box">
      <div className="has-text-centered">
        <strong>{drink.name}</strong>
      </div>
      <div className="has-text-centered" style={{ margin: '10px 0' }}>
        <strong className="title is-5">{centToEuro(drink.price)}€</strong>
      </div>
      <div className="has-text-centered">
        <Button
          className="is-primary"
          text="Muokkaa"
          style={{ margin: '0 5px' }}
          onClick={() => handleEditOpen(drink)}
        />
        {drink.selected ? (
          <Button className="is-danger" text="Poista valinta" onClick={() => handleSelect(drink)} />
        ) : (
          <Button className="is-success" text="Valitse" onClick={() => handleSelect(drink)} />
        )}
      </div>
    </div>
  )
}

export default DrinkBox
