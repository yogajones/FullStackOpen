import deepFreeze from 'deep-freeze'
import reducer, { initialState } from './filterReducer'

describe('filter reducer', () => {
    const state = { ...initialState }

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer(undefined, action)
        expect(newState).toEqual('')
    })

    test('updates filter correctly', () => {
        const action = {
            type: 'SET_FILTER',
            payload: 'redux'
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        expect(newState).toEqual('redux')
    })
})