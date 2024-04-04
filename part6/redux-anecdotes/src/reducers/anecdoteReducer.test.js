import deepFreeze from 'deep-freeze'
import reducer, { initialState } from './anecdoteReducer'

describe('anecdote reducer', () => {
    test('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('vote is incremented when VOTE action is dispatched', () => {
        const state = initialState
        const action = {
            type: 'VOTE',
            payload: {
                id: initialState[0].id
            }
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
})