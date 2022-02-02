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
      const data = persons.filter(
        person => person.name === newName
      )
      console.log(data)
      const id = data[0].id
      if (window.confirm(`${newName} is already added to phonebook,
      replace the old number with new one?`)) {
        pbService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id !== id ? person : returnedPerson))
      setNewName('')
      setNewNumber('')
        })
      
      }
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
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)){
      pbService.remove(person.id)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input
          type='text'
          onChange={handleNewFilter} 
          />
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
