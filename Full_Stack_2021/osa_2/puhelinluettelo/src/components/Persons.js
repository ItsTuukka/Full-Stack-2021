import React from 'react'

const ShowNumbers = ({persons}, {newFilter}) => {
    return(
      persons.map(person =>
        <ShowPerson key={person.name} person={person} />
      )
    )
    }
  
  const ShowPerson = ({person}) => {
    return(
    <p>{person.name} {person.number}</p>
    )
  }

  export default ShowNumbers