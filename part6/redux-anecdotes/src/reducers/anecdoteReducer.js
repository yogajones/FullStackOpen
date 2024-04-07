import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state, action) {
      const id = action.payload.id
      const anecdote = state.find(anec => anec.id === id)
      if (anecdote) {
        anecdote.votes++
      }
      return state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      return state
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.vote(anecdote)
    dispatch(voteAction(updatedAnec))
  }
}

export default anecdoteSlice.reducer