import React, { useState, useEffect } from 'react'
import { centToEuro, validateEuro, euroToCent } from '../utils/centEuroConverter'

const OrganizationForm = ({ handleSubmit, handleClose, organization }) => {
  useEffect(() => {
    if (organization) {
      setName(organization.name)
      setMaxTab(centToEuro(organization.maxTab))
    }
  }, [organization])

  const [name, setName] = useState('')
  const [maxTab, setMaxTab] = useState('')

  const invalidName = name.length > 0 && name.length < 3
  const invalidMaxTab = maxTab.length > 0 && !validateEuro(maxTab)

  const onSubmit = async event => {
    event.preventDefault()
    if (!(invalidName || invalidMaxTab)) {
      handleSubmit({ ...organization, name, maxTab: euroToCent(maxTab) })
    }
  }

  return (
    <form onSubmit={event => onSubmit(event)}>
      <div>
        <div className="field">
          <label className="label">Järjestön nimi</label>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Nimi"
                value={name}
                onChange={e => setName(e.target.value)}
                style={invalidName ? { borderColor: 'red' } : null}
              />
              {invalidName ? <small>Nimen tulee olla vähintää 3 merkkiä</small> : null}
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Jäsenen maksimivelka</label>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Maksimivelka"
                value={maxTab}
                onChange={e => setMaxTab(e.target.value)}
                style={invalidMaxTab ? { borderColor: 'red' } : null}
              />
            </div>
            <div className="control">
              <span className="button is-static">€</span>
            </div>
          </div>
          {invalidMaxTab ? <small>Virheellinen luku</small> : null}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              Tallenna järjestö
            </button>
          </div>
          <div className="control">
            <div className="button" onClick={handleClose}>
              Peruuta
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OrganizationForm
