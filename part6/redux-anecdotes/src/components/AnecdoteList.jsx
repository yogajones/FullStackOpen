import { voteAction } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter !== ''
            ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            : anecdotes
    })

    const dispatch = useDispatch()

    const vote = ({ content, id }) => {
        console.log('vote', id)
        dispatch(voteAction(id))
        dispatch(setNotification(`You voted: ${content}`))
        setTimeout((() => { (dispatch(clearNotification())) }), 5000)
    }

    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
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