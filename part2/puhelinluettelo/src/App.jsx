import { useState, useEffect } from 'react'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (personToDelete) => {

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
    else { console.log("User cancelled deletion.") }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add new person</h3>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App