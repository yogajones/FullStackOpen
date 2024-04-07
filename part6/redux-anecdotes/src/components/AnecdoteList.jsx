import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter !== ''
            ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            : anecdotes
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('voted', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted: ${anecdote.content}`))
        setTimeout((() => { (dispatch(clearNotification())) }), 5000)
    }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id} style={{ marginBottom: 15 }}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} votes
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList