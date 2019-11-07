import React, { useState, useEffect } from 'react'
import organizationService from '../services/organization'
import drinkService from '../services/drink'
import TemplatePage from './TemplatePage'
import CustomerAutocomplete from '../components/CustomerAutocomplete'

const FrontPage = () => {
  const [organizations, setOrganizations] = useState([])
  const [customers, setCustomers] = useState([])
  const [drinks, setDrinks] = useState([])

  const [customer, setCustomer] = useState()
  const [organization, setOrganization] = useState()

  useEffect(() => {
    organizationService.getAll().then(o => {
      setOrganizations(o)
      o.length && setCustomers(o[0].customers)
      o.length && setOrganization(o[0])
    })
    drinkService.getSelected().then(d => setDrinks(d))
  }, [])

  useEffect(() => {
    organization && setCustomers(organization.customers)
  }, [organization])

  const mapOrganizationsToOptions = () =>
    organizations.map(o => (
      <option key={o.id} value={o.id}>
        {o.name}
      </option>
    ))

  const getOrganizationById = id => {
    for (const o of organizations) {
      if (o.id === id) {
        return o
      }
    }
  }

  return (
    <TemplatePage>
      <div className="container">
        <h2 className="title is-3">Lisää ostos</h2>
        <label className="label">Järjestö</label>
        <div className="field">
          <div className="control">
            <div className="select">
              {organizations.length && organization ? (
                <select
                  value={organization.id}
                  onChange={e => setOrganization(getOrganizationById(e.target.value))}
                >
                  {mapOrganizationsToOptions()}
                </select>
              ) : null}
            </div>
          </div>
        </div>
        <label className="label">Asiakkaan nimi</label>
        <CustomerAutocomplete customers={customers} customer={customer} setCustomer={setCustomer} />
      </div>
    </TemplatePage>
  )
}

export default FrontPage
