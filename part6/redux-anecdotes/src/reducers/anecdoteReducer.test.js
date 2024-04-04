import deepFreeze from 'deep-freeze'
import reducer, { initialState } from './anecdoteReducer'

describe('anecdote reducer', () => {
    const state = initialState

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('vote is incremented when VOTE action is dispatched', () => {
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

    test('appends new anecdote to existing state with action NEW_ANECDOTE', () => {
        const action = {
            type: 'NEW_ANECDOTE',
            payload: {
                content: 'Missing semicolons bring developers to their knees.',
                votes: 0,
                id: 1732485235245
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(state.length + 1)
        expect(newState).toContainEqual(action.payload)
    })
})