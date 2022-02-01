import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filtering = ({filter, handleFilter}) => {
  return (
    <p>find countries <input
    value={filter}
    onChange={handleFilter} />
    </p>
  )
}

const Show = ({names, countries, current, setCurrent}) => {
  if (current !== '') {
    const data = countries.filter(
      entry => entry.name.common === current
    )
    const languages = Object.values(data[0].languages)
    return(
      <div>
        <h1>{data[0].name.common}</h1>
        capital: {data[0].capital}
        <br></br>
        region: {data[0].region}
        <h2>languages</h2>
        <ul>
          {languages.map(language => 
          <li key={language.id}> 
          {language}</li>)}
        </ul>
          <img src={data[0].flags.png} alt="flag" height='100px'/>
      </div>
    )
  }
  else {
    return(
    <Render names={names} setCurrent={setCurrent}/>
    )}
}

const Render = ({names, setCurrent}) => {
  if (names.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }
  if (names.length === 1) {
    return (names.map(name => setCurrent(name))
    )
  } if (names.length <= 10 && names.length > 1) {
    return (names.map(name =>
      (<li>{name}</li>) ))
  } else {
    return(
      <p>no matches found</p>
    )
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ current, setCurrent ] = useState('')
  const names = countries.map(country => country.name.common)
  const namesToShow = names.filter
    (name => name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response =>{
      setCountries(response.data)
    })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setCurrent('')
  }

  return (
    <div>
      <Filtering filter={filter} handleFilter={handleFilter}/>
      <Show names ={namesToShow} countries={countries} current={current} setCurrent={setCurrent}/>
    </div>
  )
}

export default App