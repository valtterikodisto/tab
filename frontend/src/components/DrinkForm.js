import React, { useEffect } from 'react'
import useField from '../hooks/useField'
import { validateDrinkName, validateEuro } from '../utils/validation'
import { centToEuro, euroToCent } from '../utils/centEuroConverter'
import FormField from './FormField'

const DrinkForm = ({ drink, handleSubmit, handleClose }) => {
  const { error: nameError, set: setName, ...name } = useField('text', null, validateDrinkName)
  const { error: priceError, set: setPrice, ...price } = useField('text', validateEuro)
  const { error: instructionsError, set: setInstructions, ...instructions } = useField('text')
  const hasErrors = nameError || priceError || !name.value || !price.value

  useEffect(() => {
    if (drink && drink.id) {
      setName(drink.name)
      setPrice(centToEuro(drink.price))
      setInstructions(drink.instructions)
    }
  }, [drink])

  const onSubmit = event => {
    event.preventDefault()
    handleSubmit({
      ...drink,
      name: name.value,
      price: euroToCent(price.value),
      instructions: instructions.value
    })
    clearFields()
  }

  const onClose = () => {
    handleClose()
    clearFields()
  }

  const clearFields = () => {
    setName('')
    setPrice('')
    setInstructions('')
  }

  return (
    <form onSubmit={event => onSubmit(event)}>
      <div className="field">
        <label className="label">Juoman nimi</label>
        <div className="field has-addons">
          <div className="control">
            <FormField placeholder="Nimi" attributes={name} error={nameError} />
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Juoman hinta</label>
        <div className="field has-addons">
          <div className="control">
            <FormField placeholder="Hinta" attributes={price} error={priceError} />
          </div>
          <div className="control">
            <span className="button is-static">€</span>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Ohjeet</label>
        <div className="field has-addons">
          <div className="control">
            <textarea className="textarea" placeholder="Ohjeet" {...instructions} />
            <small style={{ fontWeight: 300, color: 'red' }}>{instructionsError || null}</small>
          </div>
        </div>
      </div>

      <button type="submit" className="button is-primary" disabled={hasErrors}>
        Tallenna juoma
      </button>
      <div className="button" onClick={onClose}>
        Peruuta
      </div>
    </form>
  )
}

export default DrinkForm
