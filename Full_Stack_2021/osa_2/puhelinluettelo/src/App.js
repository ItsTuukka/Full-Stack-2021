import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import ShowNumbers from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const names = persons.map(person => person.name)

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response =>{
      setPersons(response.data)
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
    setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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
        <ShowNumbers persons={persons} filter={newFilter} />
      </div>
    </div>
  )

}

export default App
