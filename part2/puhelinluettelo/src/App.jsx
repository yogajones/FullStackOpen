import { useState, useEffect } from 'react'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import SuccessNotification from './components/SuccessNotification'
import './styles/index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)

  const [filter, setFilter] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const updateNumber = (personObject) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the existing number with ${personObject.number}?`)) {
      personService
        .update(personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Succesfully updated the number for ${returnedPerson.name}!`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
      return
    }
    console.log("User canceled updating number.");
    return
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      updateNumber({ ...existingPerson, number: newNumber })
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Succesfully added ${returnedPerson.name} to phonebook!`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      })
  }

  const deletePerson = (personToDelete) => {

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setSuccessMessage(`Succesfully deleted ${personToDelete.name}!`)
          setTimeout(() => { setSuccessMessage(null) }, 5000)
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
      <SuccessNotification message={successMessage} />

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