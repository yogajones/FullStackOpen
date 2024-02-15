import { useState, useEffect } from 'react'
import infoService from './services/infoservice'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    infoService
      .getAll()
      .then(countryData => {
        setCountries(countryData)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Country Information App</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      {filter !== '' ? (<Countries countries={countriesToShow} />) : null}
    </div>
  )
}

export default App
