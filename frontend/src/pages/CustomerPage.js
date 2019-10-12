import React, { useState, useEffect } from 'react'
import customerService from '../services/customers'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import Button from '../components/Button'
import CustomerBox from '../components/CustomerBox'
import InfiniteScroll from 'react-infinite-scroller'
import Search from '../components/Search'

const CustomerPage = () => {
  const [customers, setCustomers] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [hasMoreCustomers, setHasMoreCustomers] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      customerService
        .search(search)
        .then(c => setSearchResults(c))
        .catch(e => console.log(e))
    }
  })

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

  return (
    <TemplatePage>
      <h1 className="title has-text-centered">Asiakkaat</h1>
      <div className="columns is-centered">
        <Search value={search} placeholder={'Etsi asiakas'} handleChange={handleSearchChange} />
      </div>

      {search ? (
        <div className="container">
          {searchResults.map(c => (
            <CustomerBox customer={c} key={c.id} />
          ))}
        </div>
      ) : (
        <InfiniteScroll pageStart={0} loadMore={loadMoreCustomers} hasMore={hasMoreCustomers}>
          <div className="container">
            {customers.map(c => (
              <CustomerBox customer={c} key={c.id} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(CustomerPage)
