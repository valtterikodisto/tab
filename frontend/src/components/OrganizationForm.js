import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import { validateOrganizationName, validateEuro } from '../utils/validation'
import FormField from './FormField'
import { centToEuro, euroToCent } from '../utils/centEuroConverter'

const OrganizationForm = ({ handleSubmit, handleClose, organization }) => {
  const { error: nameError, set: setName, ...name } = useField(
    'text',
    null,
    validateOrganizationName
  )
  const { error: maxTabError, set: setMaxTab, ...maxTab } = useField('text', validateEuro)
  const hasErrors = nameError || maxTabError || !name.value || !maxTab.value

  useEffect(() => {
    if (organization) {
      setName(organization.name)
      setMaxTab(centToEuro(organization.maxTab))
    }
  }, [organization])

  const onSubmit = async event => {
    event.preventDefault()
    if (!hasErrors) {
      handleSubmit({ ...organization, name, maxTab: euroToCent(maxTab) })
      clearFields()
    }
  }

  const onClose = () => {
    handleClose()
    clearFields()
  }

  const clearFields = () => {
    setName('')
    setMaxTab('')
  }

  return (
    <form onSubmit={event => onSubmit(event)}>
      <div>
        <div className="field">
          <label className="label">Järjestön nimi</label>
          <div className="field has-addons">
            <div className="control">
              <FormField placeholder="Nimi" attributes={name} error={nameError} />
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Jäsenen maksimivelka</label>
          <div className="field has-addons">
            <div className="control">
              <FormField placeholder="Maksimivelka" attributes={maxTab} error={maxTabError} />
            </div>
            <div className="control">
              <span className="button is-static">€</span>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary" disabled={hasErrors}>
              Tallenna järjestö
            </button>
          </div>
          <div className="control">
            <div className="button" onClick={onClose}>
              Peruuta
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OrganizationForm
