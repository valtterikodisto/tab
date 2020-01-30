import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import { euroToCent, centToEuro, validateEuro } from '../utils/centEuroConverter'

const CustomerForm = ({
  handleSubmit,
  handleClose,
  customer,
  organizations,
  handleDeleteButton
}) => {
  const [organization, setOrganization] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [yearOfBirth, setYearOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [balance, setBalance] = useState('')

  const invalidBalance = balance.length > 0 && !validateEuro(balance)
  const invalidYearOfBirth =
    (yearOfBirth && !Number.isInteger(parseInt(yearOfBirth))) || parseInt(yearOfBirth) < 1900
  const invalidEmail =
    email &&
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  const redIfInvalid = isInvalid => (isInvalid ? { borderColor: 'red' } : null)
  const makeInvalidMessage = (isInvalid, message) => (isInvalid ? <small>{message}</small> : null)
  const optional = () => {
    return <small style={{ fontWeight: '300' }}>(valinnainen)</small>
  }

  useEffect(() => {
    if (organizations.length && !organization) {
      setOrganization(organizations[0].id)
      setBalance(0)
    }
  }, [organizations])

  useEffect(() => {
    if (customer) {
      setOrganization(customer.organization.id)
      setFirstname(customer.firstname)
      setLastname(customer.lastname)
      setYearOfBirth(customer.yearOfBirth ? customer.yearOfBirth : '')
      setEmail(customer.email ? customer.email : '')
      setBalance(customer.balance ? centToEuro(customer.balance) : '0')
    }
  }, [customer])

  const mapOrganizationsToOptions = () => {
    if (organizations) {
      return organizations.map(o => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))
    }

    return null
  }

  const onSubmit = async event => {
    event.preventDefault()

    const invalidInput =
      !firstname.trim() ||
      !lastname.trim() ||
      invalidBalance ||
      invalidYearOfBirth ||
      invalidEmail ||
      !organization

    console.log(invalidInput)

    if (invalidInput) return

    const newCustomer = customer
      ? {
          ...customer,
          organization,
          firstname,
          lastname,
          yearOfBirth,
          email,
          balance: euroToCent(balance)
        }
      : {
          organization,
          firstname,
          lastname,
          yearOfBirth,
          email,
          balance: euroToCent(balance)
        }

    emptyFields()
    handleSubmit(removeUnnecessaryFields(newCustomer))
  }

  const handleFormClose = () => {
    handleClose()
    emptyFields()
  }

  const removeUnnecessaryFields = customer => {
    if (!customer.yearOfBirth && !customer.email) {
      const { yearOfBirth, email, ...modifiedCustomer } = customer
      return modifiedCustomer
    } else if (!customer.yearOfBirth) {
      const { yearOfBirth, ...modifiedCustomer } = customer
      return modifiedCustomer
    } else if (!customer.email) {
      const { email, ...modifiedCustomer } = customer
      return modifiedCustomer
    }
    return customer
  }

  const emptyFields = () => {
    setOrganization(organizations[0] && organizations[0].id)
    setFirstname('')
    setLastname('')
    setYearOfBirth('')
    setEmail('')
    setBalance('')
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="label">Järjestö</label>
      <div className="field has-addons">
        <div className="control">
          <div className="select">
            {organizations.length ? (
              <select
                value={organization || organizations[0].id}
                onChange={e => setOrganization(e.target.value)}
              >
                {mapOrganizationsToOptions()}
              </select>
            ) : null}
          </div>
        </div>
      </div>

      <label className="label">Etunimi</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
      </div>
      <label className="label">Sukunimi</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
      </div>

      <label className="label">Tili</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setBalance(e.target.value)}
            value={balance}
            style={redIfInvalid(invalidBalance)}
          />
        </div>

        <div className="control">
          <span className="button is-static">€</span>
        </div>
      </div>
      {makeInvalidMessage(invalidBalance, 'Virheellinen luku')}
      <label className="label">Syntymävuosi {optional()}</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setYearOfBirth(e.target.value)}
            value={yearOfBirth}
            style={redIfInvalid(invalidYearOfBirth)}
          />
        </div>
      </div>
      {makeInvalidMessage(invalidYearOfBirth, 'Vuoden tulee olla vähintään 1900')}
      <label className="label">Sähköposti {optional()}</label>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
            style={redIfInvalid(invalidEmail)}
          />
        </div>
      </div>
      <div>{makeInvalidMessage(invalidEmail, 'Virheellinen sähköposti')}</div>

      <Button
        style={{ marginRight: '5px' }}
        type="submit"
        text="Tallenna"
        disabled={!organization}
      />
      <div className="button" style={{ margin: '0 5px' }} onClick={handleFormClose}>
        Peruuta
      </div>
      {customer ? (
        <div
          style={{ marginLeft: '5px' }}
          className="button is-danger"
          onClick={() => handleDeleteButton(customer)}
        >
          Poista
        </div>
      ) : null}
    </form>
  )
}

export default CustomerForm
