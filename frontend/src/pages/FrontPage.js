import React, { useState, useEffect } from 'react'
import organizationService from '../services/organization'
import drinkService from '../services/drink'
import TemplatePage from './TemplatePage'
import CustomerAutocomplete from '../components/CustomerAutocomplete'
import DrinkAddBox from '../components/DrinkAddBox'
import TotalBox from '../components/TotalBox'
import useField from '../hooks/useField'
import { validateEuro } from '../utils/validation'
import FormField from '../components/FormField'
import { euroToCent, centToEuro } from '../utils/centEuroConverter'
import Button from '../components/Button'
import { purchase } from '../services/order'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const FrontPage = ({ setNotification }) => {
  const [organizations, setOrganizations] = useState([])
  const [customers, setCustomers] = useState([])
  const [drinks, setDrinks] = useState([])

  const [customer, setCustomer] = useState()
  const [organization, setOrganization] = useState()
  const { error: depositError, set: setDeposit, ...deposit } = useField('text', validateEuro)
  const [order, setOrder] = useState([])

  const handleDrinkAdd = drink => setOrder(order.concat(drink))

  const handleDrinkSubstract = drink => {
    let found = false
    setOrder(
      order.filter(o => {
        if (found) {
          return true
        } else if (o.id === drink.id) {
          found = true
          return false
        }
        return true
      })
    )
  }

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

  const drinkBox = () => {
    if (drinks && drinks.length) {
      return (
        <div className="columns is-multiline" style={{ padding: '2rem 0' }}>
          {drinks.map(d => (
            <div key={d.id} className="column is-one-quarter">
              <DrinkAddBox
                drink={d}
                handleAdd={handleDrinkAdd}
                handleSubstract={handleDrinkSubstract}
              />
            </div>
          ))}
        </div>
      )
    }
  }

  const total = () => order.reduce((sum, drink) => drink.price + sum, 0) - euroToCent(deposit.value)
  const correctCustomer = () => {
    if (!customer) return true
    return customer.organization === organization.id
  }

  const isDisabled = () =>
    !organization ||
    !customer ||
    depositError ||
    insufficientBalance() ||
    (!euroToCent(deposit.value) && !total()) ||
    !correctCustomer() ||
    customer.block
  const insufficientBalance = () =>
    customer && organization ? customer.balance - total() < -organization.maxTab : false

  const handlePurchase = () => {
    if (isDisabled()) return
    purchase(customer, total(), order)
      .then(({ customer }) => {
        setNotification(
          `${customer.firstname} ${customer.lastname} tilaus (${centToEuro(total())}€) tallennettu`,
          'is-success'
        )
        setCustomers(customers.map(c => (c.id === customer.id ? customer : c)))
        setCustomer(customer)
        reset()
      })
      .catch(e => {
        setNotification('Tilauksen tallennus ei onnistunut', 'is-danger')
        console.log(e)
      })
  }

  const reset = () => {
    setOrganization(organizations[0])
    setDeposit('')
    setOrder([])
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
        {drinkBox()}

        <label className="label">Talletus</label>
        <div className="field has-addons">
          <div className="control">
            <FormField attributes={deposit} error={depositError} />
          </div>
          <div className="control">
            <span className="button is-static">€</span>
          </div>
        </div>
        <TotalBox order={order} total={total()} insufficientBalance={insufficientBalance} />
        <Button text="Tallenna ostos" onClick={handlePurchase} disabled={isDisabled()} />
      </div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(FrontPage)
