import { createSlice } from '@reduxjs/toolkit'

const journeySlice = createSlice({
  name: 'journeys',
  initialState: [],
  reducers: {
    setJourneys(state, action) {
      return action.payload
    },
  },
})

export const { setJourneys } = journeySlice.actions
export default journeySlice.reducer
