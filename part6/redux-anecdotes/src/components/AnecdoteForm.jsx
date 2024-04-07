import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnec = await anecdoteService.createNew(content)
        dispatch(createAction(newAnec))
        dispatch(setNotification(`Succesfully added: ${content}`))
        setTimeout((() => { (dispatch(clearNotification())) }), 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm