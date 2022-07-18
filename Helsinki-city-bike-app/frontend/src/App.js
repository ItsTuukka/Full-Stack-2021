import React from 'react'
import { useEffect } from 'react'
import journeyService from './services/journey'
import stationService from './services/station'
import { setJourneys } from './reducers/journeyReducer'
import { useDispatch } from 'react-redux'
import { setStations } from './reducers/stationReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    journeyService.getAll().then((journeys) => dispatch(setJourneys(journeys)))
  }, [dispatch])

  useEffect(() => {
    stationService.getAll().then((stations) => dispatch(setStations(stations)))
  }, [dispatch])

  return (
    <div>
      <h2>Helsinki city bike app</h2>
    </div>
  )
}

export default App
