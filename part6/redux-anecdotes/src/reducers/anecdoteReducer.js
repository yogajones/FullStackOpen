import { createSlice } from '@reduxjs/toolkit'

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
      //console.log(JSON.parse(JSON.stringify(state))) //DEBUG
      return state.sort((a, b) => b.votes - a.votes)
    },
    createAction(state, action) {
      state.push(action.payload)
      //console.log(JSON.parse(JSON.stringify(state))) //DEBUG
    },
    initializeAction(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, createAction, initializeAction } = anecdoteSlice.actions
export default anecdoteSlice.reducer