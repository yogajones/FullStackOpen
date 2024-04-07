import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdote reducer', () => {
    const initialState = []
    let state = initialState

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = reducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('appends new anecdote to existing ones', () => {
        const action = {
            type: 'anecdotes/appendAnecdote',
            payload: {
                id: 11039329,
                content: 'Missing semicolons bring developers to their knees.',
                votes: 0
            }
        }

        deepFreeze(state)
        const newState = reducer(state, action)

        expect(newState).toHaveLength(state.length + 1)
        expect(newState.map(obj => obj.content)).toContain(action.payload.content)
    })

    describe('when an anecdote exists..', () => {
        const action = {
            type: 'anecdotes/appendAnecdote',
            payload: {
                id: 11039329,
                content: 'Missing semicolons bring developers to their knees.',
                votes: 0
            }
        }
        state = reducer(state, action)

        test('..it can be voted', () => {
            const action = {
                type: 'anecdotes/voteAction',
                payload: {
                    id: 11039329,
                    content: 'Missing semicolons bring developers to their knees.',
                    votes: 0
                }
            }

            const expectedState = [
                {
                    id: 11039329,
                    content: 'Missing semicolons bring developers to their knees.',
                    votes: 1
                }
            ]

            deepFreeze(state)
            const newState = reducer(state, action)
            expect(newState).toEqual(expectedState)
        })
    })
})