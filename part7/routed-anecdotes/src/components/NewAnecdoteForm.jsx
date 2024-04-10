import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'


const NewAnecdoteForm = ({ addNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.input.value,
            author: author.input.value,
            info: info.input.value,
            votes: 0
        })
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset} >
                <div>
                    content:
                    <input {...content.input} />
                </div>
                <div>
                    author:
                    <input {...author.input} />
                </div>
                <div>
                    url for more info:
                    <input {...info.input} />
                </div>
                <button type='submit'>create</button>
                <button type='reset'>reset</button>
            </form>
        </div>
    )
}

NewAnecdoteForm.propTypes = {
    addNew: PropTypes.func.isRequired
}

export default NewAnecdoteForm