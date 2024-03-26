import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const like = (event) => {
    event.preventDefault()
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      addedBy: blog.user.id
    })
  }

  const remove = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteBlog(blog)
    }
    console.log('User canceled deletion.')
  }

  const blogStyle = {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={hideWhenVisible} id='hide-details'>
        <div style={blogStyle}>
          <button style={{ marginRight: '13px' }} onClick={() => setDetailsVisible(true)}>view</button>
          <b>{blog.title}</b> ({blog.author})
        </div>
      </div>

      <div style={showWhenVisible} id='show-details'>
        <div style={blogStyle}>
          <button style={{ marginRight: '15px' }} onClick={() => setDetailsVisible(false)}>hide</button>
          <b>{blog.title}</b> ({blog.author})
          <p>Likes: {blog.likes} <button onClick={like} style={{ marginLeft: '15px' }}>like</button></p>
          <p>{blog.url}</p>
          {blog.user && blog.user.username && (
            <p>Added by {blog.user.username}</p>)}
          {blog.user && blog.user.username && (blog.user.username === user.username) && (
            <button onClick={remove}>remove</button>)}
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog