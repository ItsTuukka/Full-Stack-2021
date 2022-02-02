import React from 'react'

const ShowNumbers = ({persons, newFilter, handleClick}) => {
    return(
      persons.map(person =>
        <ShowPerson key={person.name} person={person} handleClick={handleClick}/>
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