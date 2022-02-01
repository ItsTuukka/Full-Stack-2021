import React from 'react'

const ShowNumbers = ({persons}, {newFilter}) => {
  const toShow = persons.filter(person => 
    person.name.toLowerCase().includes
    (newFilter.toLowerCase()))
  console.log(toShow)
    return(
      toShow.map(person =>
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