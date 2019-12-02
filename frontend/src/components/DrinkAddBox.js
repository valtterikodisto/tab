import React, { useState } from 'react'
import ModalCard from './ModalCard'
import ReactMarkdown from 'react-markdown'
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
  const [infoOpen, setInfoOpen] = useState(false)

  const infoButton = () => {
    if (!drink.instructions) {
      return null
    }

    return (
      <button
        className="button is-secondary is-small"
        style={{ margin: '1em 0' }}
        onClick={() => setInfoOpen(true)}
      >
        INFO
      </button>
    )
  }

  return (
    <div className="box has-text-centered">
      <p>{`${drink.name} ${centToEuro(drink.price)}€`} </p>
      {infoButton()}
      <div>
        <button style={style} onClick={() => handleAdd(drink)}>
          +
        </button>
        <button style={substractStyle} onClick={() => handleSubstract(drink)}>
          -
        </button>
      </div>

      <ModalCard
        title={`Ohje: ${drink.name}`}
        visible={infoOpen}
        closeVisible={true}
        handleClose={() => setInfoOpen(false)}
      >
        <ReactMarkdown source={drink.instructions} escapeHtml={false} />
      </ModalCard>
    </div>
  )
}

export default DrinkAddBox
