import React from 'react'
import { centToEuro } from '../utils/centEuroConverter'

const style = {
  backgroundColor: '#19323c',
  color: 'white',
  border: 'none',
  padding: '4px 16px',
  margin: 2,
  borderRadius: 5,
  fontSize: '1rem',
  outline: 'none',
  cursor: 'pointer'
}

const substractStyle = { ...style, backgroundColor: '#f2545b' }

function DrinkAddBox({ drink, handleAdd, handleSubstract }) {
  return (
    <div className="box has-text-centered">
      {`${drink.name} ${centToEuro(drink.price)}€`}
      <div>
        <button style={style} onClick={() => handleAdd(drink)}>
          +
        </button>
        <button style={substractStyle} onClick={() => handleSubstract(drink)}>
          -
        </button>
      </div>
    </div>
  )
}

export default DrinkAddBox
