import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    update(state, action) {
      const changedAnecdote = action.payload
      return state.map(a => 
        a.id !== changedAnecdote.id ? a : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.getOne(id)
    const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1}
    await anecdoteService.update(id, updatedAnecdote)
    dispatch(update(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, update } = anecdoteSlice.actions
export default anecdoteSlice.reducer