import React, { useState, useEffect } from 'react'
import customerService from '../services/customers'
import organizationService from '../services/organization'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import CustomerBox from '../components/CustomerBox'
import InfiniteScroll from 'react-infinite-scroller'
import Search from '../components/Search'
import ModalCard from '../components/ModalCard'
import CustomerForm from '../components/CustomerForm'
import CustomerDeleteBox from '../components/CustomerDeleteBox'
import PageHeader from '../components/PageHeader'

const CustomerPage = ({ setNotification }) => {
  const [organizations, setOrganizations] = useState([])
  const [customers, setCustomers] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [hasMoreCustomers, setHasMoreCustomers] = useState(true)
  const [search, setSearch] = useState('')

  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [activeCustomer, setActiveCustomer] = useState()

  useEffect(() => {
    organizationService
      .getAll()
      .then(o => setOrganizations(o))
      .catch(e => setNotification('Järjestöjä ei voitu ladata', 'is-danger'))
  }, [])

  useEffect(() => {
    if (search) {
      customerService
        .search(search)
        .then(c => setSearchResults(c))
        .catch(e => console.log(e))
    }
  }, [search])

  const loadMoreCustomers = async page => {
    customerService
      .getPage(page)
      .then(res => {
        setCustomers(customers.concat(res.customers))
        setHasMoreCustomers(res.hasMore)
      })
      .catch(e => console.log(e))
  }

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleEditOpen = customer => {
    setActiveCustomer(customer)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setActiveCustomer()
    setEditOpen(false)
  }

  const handleEditSubmit = async editedCustomer => {
    customerService
      .update(editedCustomer.id, editedCustomer)
      .then(c => {
        setCustomers(customers.map(customer => (customer.id === c.id ? c : customer)))
        setSearchResults(searchResults.map(customer => (customer.id === c.id ? c : customer)))
        handleEditClose()
        setNotification(
          `Asiakkaan ${c.firstname} ${c.lastname} tiedot päivitettiin onnistuneesti!`,
          'is-primary'
        )
      })
      .catch(e => {
        setNotification(
          `Asiakkaan ${editedCustomer.firstname} ${editedCustomer.lastname} tietoja ei voitu päivittää`,
          'is-danger'
        )
        console.log(e)
      })
  }

  const handleAddSubmit = async newCustomer => {
    customerService
      .add(newCustomer)
      .then(c => {
        if (search) {
          setSearchResults(searchResults.concat(c))
        } else {
          setCustomers(customers.concat(c))
        }
        handleAddClose()
        setNotification(`${c.firstname} ${c.lastname} lisättiin onnistuneesti!`, 'is-primary')
      })
      .catch(e => {
        setNotification(`Asiakkaan lisäys ei onnistunut`, 'is-danger')
        console.log(e)
      })
  }

  const handleAddClose = () => setAddOpen(false)

  const handleCustomerBlock = async id => {
    customerService
      .block(id)
      .then(c => {
        setCustomers(customers.map(customer => (customer.id === c.id ? c : customer)))
        setSearchResults(searchResults.map(customer => (customer.id === c.id ? c : customer)))
        setNotification(
          `${c.firstname} ${c.lastname}: ${c.block ? 'estetty' : 'esto poistettu'}`,
          'is-primary'
        )
      })
      .catch(e => {
        setNotification('Eston muuttaminen epäonnistui', 'is-danger')
        console.log(e)
      })
  }

  const handleDeleteButton = customer => {
    setEditOpen(false)
    setDeleteOpen(true)
  }

  const handleDelete = customer => {
    customerService
      .remove(customer.id)
      .then(() => {
        handleDeleteClose()
        setCustomers(customers.filter(c => c.id !== customer.id))
        setSearchResults(searchResults.filter(c => c.id !== customer.id))
        setNotification('Asiakas poistettu', 'is-primary')
      })
      .catch(e => {
        setNotification(
          `Asiakkaan ${customer.firstname} ${customer.lastname} poistaminen ei onnistunut`,
          'is-danger'
        )
        console.log(e)
      })
  }

  const handleDeleteClose = () => {
    setActiveCustomer()
    setDeleteOpen(false)
  }

  return (
    <TemplatePage>
      <div className="container">
        <PageHeader
          title="Asiakkaat"
          buttonText="Lisää asiakas"
          handleClick={() => setAddOpen(true)}
        />
        <div className="columns is-centered">
          <Search value={search} placeholder={'Etsi asiakas'} handleChange={handleSearchChange} />
        </div>

        {search ? (
          <div className="container">
            {searchResults.map(c => (
              <CustomerBox
                customer={c}
                key={c.id}
                handleEditOpen={handleEditOpen}
                handleBlock={handleCustomerBlock}
              />
            ))}
          </div>
        ) : (
          <InfiniteScroll pageStart={0} loadMore={loadMoreCustomers} hasMore={hasMoreCustomers}>
            <div className="container">
              {customers.map(c => (
                <CustomerBox
                  customer={c}
                  key={c.id}
                  handleEditOpen={handleEditOpen}
                  handleBlock={handleCustomerBlock}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}

        {activeCustomer ? (
          <ModalCard
            visible={editOpen}
            title={`${activeCustomer.firstname} ${activeCustomer.lastname}`}
            handleClose={handleEditClose}
          >
            <CustomerForm
              handleSubmit={handleEditSubmit}
              handleClose={handleEditClose}
              customer={activeCustomer}
              organizations={organizations}
              handleDeleteButton={handleDeleteButton}
            />
          </ModalCard>
        ) : null}
        <ModalCard visible={addOpen} title="Lisää asiakas" handleClose={handleAddClose}>
          <CustomerForm
            handleSubmit={handleAddSubmit}
            handleClose={handleAddClose}
            organizations={organizations}
          />
        </ModalCard>
        {deleteOpen && activeCustomer ? (
          <CustomerDeleteBox
            customer={activeCustomer}
            handleSubmit={handleDelete}
            handleClose={handleDeleteClose}
          />
        ) : null}
      </div>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(CustomerPage)
