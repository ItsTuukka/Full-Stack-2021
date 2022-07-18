import { configureStore } from '@reduxjs/toolkit'
import journeyReducer from './reducers/journeyReducer'
import stationReducer from './reducers/stationReducer'

const store = configureStore({
  reducer: {
    journeys: journeyReducer,
    stations: stationReducer,
  },
})

export default store
