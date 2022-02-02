import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import ShowNumbers from './components/Persons'
import pbService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const names = persons.map(person => person.name)

  useEffect(() => {
    pbService
    .getAll()
    .then(initialData =>{
      setPersons(initialData)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { 
      name: newName,
      number: newNumber
    }

    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      pbService
      .add(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = person => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)){
      pbService.remove(person.id)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input
          value={newFilter}
          onChange={handleNewFilter} 
          />
          <p>filtering does not work</p>
        </div>
      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
      <div>
        <ShowNumbers persons={persons} filter={newFilter} handleClick={handleDelete} />
      </div>
    </div>
  )

}

export default App
