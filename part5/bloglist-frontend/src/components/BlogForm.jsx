import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
                    title
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            id='title-input'
          />
        </div>
        <div>
                    author
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            id='author-input'
          />
        </div>
        <div>
                    url
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            id='url-input'
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>
                    create
        </button>
      </form>
    </div>
  )
}

BlogForm.proptypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm