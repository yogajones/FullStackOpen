import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdote reducer', () => {
    const initialState = []
    const state = initialState

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('vote is incremented', () => {
        const action = {
            type: 'anecdotes/voteAction',
            payload: initialState[0].id
        }

        const expectedState = [...initialState]
        expectedState[0] = {
            ...expectedState[0],
            votes: expectedState[0].votes + 1
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        expect(newState).toEqual(expectedState)
    })

    test('appends new anecdote to existing ones', () => {
        const action = {
            type: 'anecdotes/createAction',
            payload: 'Missing semicolons bring developers to their knees.'
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(state.length + 1)
        expect(newState.map(obj => obj.content)).toContain(action.payload)

    })
})