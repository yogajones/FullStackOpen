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
            content: content.value,
            author: author.value,
            info: info.value,
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
                    <input {...content} />
                </div>
                <div>
                    author:
                    <input {...author} />
                </div>
                <div>
                    url for more info:
                    <input {...info} />
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