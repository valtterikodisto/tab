import React, { useState, useEffect } from 'react'
import drinkService from '../services/drink'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import TemplatePage from './TemplatePage'
import Search from '../components/Search'
import DrinkBox from '../components/DrinkBox'
import PageHeader from '../components/PageHeader'
import DrinkForm from '../components/DrinkForm'
import ModalCard from '../components/ModalCard'
import InfiniteScroll from 'react-infinite-scroller'

const DrinkPage = ({ setNotification }) => {
  const [selectedDrinks, setSelectedDrinks] = useState([])
  const [drinks, setDrinks] = useState([])
  const [hasMoreDrinks, setHasMoreDrinks] = useState(true)
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState([])

  const [formOpen, setFormOpen] = useState(false)
  const [activeDrink, setActiveDrink] = useState()

  useEffect(() => {
    drinkService
      .getSelected()
      .then(s => setSelectedDrinks(s))
      .catch(e => setNotification('Juomia ei voitu ladata', 'is-danger'))
  }, [])

  useEffect(() => {
    if (search) {
      drinkService
        .search(search)
        .then(d => setSearchResults(d))
        .catch(e => console.log(e))
    }
  }, [search])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleFormOpen = drink => {
    if (drink) setActiveDrink(drink)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setActiveDrink(null)
  }

  const handleFormSubmit = async drink => {
    try {
      if (drink.id) {
        const updatedDrink = await drinkService.update(drink.id, drink)
        addUpdatedDrink(updatedDrink)
        setNotification(`Juoma ${updatedDrink.name} päivitettiin onnistuneest`, 'is-primary')
      } else {
        const savedDrink = await drinkService.add(drink)
        addNewDrink(savedDrink)
        setNotification(`Juoma ${savedDrink.name} lisättiin onnistuneest`, 'is-primary')
      }
      handleFormClose()
    } catch (error) {
      console.log(error)
      setNotification(`Juoman ${drink.name} tallennus epäonnistui`, 'is-danger')
    }
  }

  const handleSelect = async drink => {
    const updatedDrink = await drinkService.select(drink.id, drink)
    setSearchResults(searchResults.map(d => (d.id === updatedDrink.id ? updatedDrink : d)))

    if (updatedDrink.selected) {
      setSelectedDrinks(selectedDrinks.concat(updatedDrink))
    } else {
      setSelectedDrinks(selectedDrinks.filter(d => d.id !== updatedDrink.id))
    }
    setDrinks(drinks.map(d => (d.id === updatedDrink.id ? updatedDrink : d)))
  }

  const loadMoreDrinks = async page => {
    drinkService
      .getPage(page)
      .then(res => {
        setDrinks(drinks.concat(res.drinks))
        setHasMoreDrinks(res.hasMore)
      })
      .catch(e => console.log(e))
  }

  const addUpdatedDrink = drink => {
    setSelectedDrinks(selectedDrinks.map(d => (d.id === drink.id ? drink : d)))
    setDrinks(drinks.map(d => (d.id === drink.id ? drink : d)))
    setSearchResults(searchResults.map(d => (d.id === drink.id ? drink : d)))
  }

  const addNewDrink = drink => {
    setDrinks(drinks.concat(drink))
  }

  const mapToDrinkBox = arr => {
    if (arr && arr.length > 0) {
      return arr.map(drink => (
        <DrinkBox
          key={drink.id}
          drink={drink}
          handleEditOpen={() => handleFormOpen(drink)}
          handleSelect={handleSelect}
        />
      ))
    }

    return <p className="has-text-centered">Ei juomia</p>
  }

  const mapDrinks = () => {
    if (searchResults && search) {
      return (
        <>
          <h4 className="title is-4 has-text-centered">Hakutulokset</h4>
          {mapToDrinkBox(searchResults)}
        </>
      )
    }

    return (
      <>
        <div className="section">
          <h2 className="title is-4 has-text-centered">Valitut</h2>
          {mapToDrinkBox(selectedDrinks)}
        </div>
        <h2 className="title is-4 has-text-centered">Kaikki</h2>
        <InfiniteScroll pageStart={0} loadMore={loadMoreDrinks} hasMore={hasMoreDrinks}>
          <div className="container">{mapToDrinkBox(drinks)}</div>
        </InfiniteScroll>
      </>
    )
  }

  return (
    <TemplatePage>
      <div className="container">
        <PageHeader title="Hinnasto" buttonText="Lisää juoma" handleClick={handleFormOpen} />
        <div className="columns is-centered">
          <Search value={search} placeholder="Etsi juoma" handleChange={handleSearchChange} />
        </div>
        {mapDrinks()}
      </div>

      <ModalCard
        title={activeDrink ? 'Juoman muokkaus' : 'Juoman lisäys'}
        visible={formOpen}
        handleClose={handleFormClose}
      >
        <DrinkForm
          drink={activeDrink}
          handleSubmit={handleFormSubmit}
          handleClose={handleFormClose}
        />
      </ModalCard>
    </TemplatePage>
  )
}

export default connect(
  null,
  { setNotification }
)(DrinkPage)
