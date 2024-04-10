import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'


const Anecdote = ({ anecdotes }) => {
    const padding = {
        paddingBottom: 10
    }

    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div style={padding}>Has {anecdote.votes} votes</div>
            <div style={padding}>For more info: {anecdote.info}</div>
        </div>
    )
}

Anecdote.propTypes = {
    anecdotes: PropTypes.array.isRequired
}

export default Anecdote