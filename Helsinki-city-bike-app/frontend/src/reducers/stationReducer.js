import { createSlice } from '@reduxjs/toolkit'

const stationSlice = createSlice({
  name: 'stations',
  initialState: [],
  reducers: {
    setStations(state, action) {
      return action.payload
    },
  },
})

export const { setStations } = stationSlice.actions
export default stationSlice.reducer
