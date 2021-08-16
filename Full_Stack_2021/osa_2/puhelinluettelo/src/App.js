import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const names = persons.map(person => person.name)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
    setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNewPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
          name: <input
            value={newName}
            onChange={handleNewPerson}
          />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>
        debug: {newName}
      </div> */}
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <li key={person.name}>
            {person.name}
          </li>)}
      </div>
    </div>
  )

}

export default App
