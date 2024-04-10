import PropTypes from 'prop-types'


const Anecdote = ({ anecdote }) => {
    const padding = {
        paddingBottom: 10
    }

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div style={padding}>Has {anecdote.votes} votes</div>
            <div style={padding}>For more info: {anecdote.info}</div>
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.object
}

export default Anecdote