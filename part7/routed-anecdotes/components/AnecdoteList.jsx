import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, vote }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote =>
                <li key={anecdote.id} >
                    <button onClick={() => vote(anecdote.id)} style={{ marginRight: 10 }} >Vote</button>
                    <Link to={`/anecdotes/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>)}
        </ul>
    </div>
)

AnecdoteList.propTypes = {
    anecdotes: PropTypes.array.isRequired,
    vote: PropTypes.func.isRequired
}

export default AnecdoteList
