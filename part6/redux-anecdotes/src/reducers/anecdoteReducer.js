import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      const id = action.payload
      const anecdote = state.find(anec => anec.id === id)
      if (anecdote) {
        anecdote.votes++
      }
      return state.sort((a, b) => b.votes - a.votes)
    },
    createAction(state, action) {
      state.push(action.payload)
      return state
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, createAction, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}

export default anecdoteSlice.reducer