import {useState} from 'react'

const Blog = ({ blog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

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
    <div style={hideWhenVisible}>
      <div style={blogStyle}>
        <button style={{marginRight: '13px'}} onClick={() => setDetailsVisible(true)}>view</button>
        <b>{blog.title}</b> ({blog.author})
      </div>
    </div>

    <div style={showWhenVisible}>
      <div style={blogStyle}>
        <button style={{marginRight: '15px'}} onClick={() => setDetailsVisible(false)}>hide</button>
        <b>{blog.title}</b> ({blog.author})
        <p>Likes: {blog.likes} <button style={{marginLeftt: '15px'}}>like</button></p>
        <p>{blog.url}</p>
        {blog.user && blog.user.username && (
        <p>Added by {blog.user.username}</p>)}
      </div>
    </div>
  </div>
)}

export default Blog