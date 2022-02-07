import React from 'react'

const ShowNumbers = ({persons, filter, handleClick}) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()))
    return(
      filtered.map(person =>
        <ShowPerson key={person.id} person={person} handleClick={handleClick}/>
        )
    )
    }
  
  const ShowPerson = ({person, handleClick}) => {
    return(
    <p>{person.name} {person.number}
    <button onClick={() => handleClick(person)}>
      delete
    </button>
    </p>
    )
  }

  export default ShowNumbers