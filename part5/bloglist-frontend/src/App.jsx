import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import toastConfig from './config/toast'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in as', username)
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login succesful')
    } catch (exception) {
      console.log('login failed')
      toast.error('Wrong username or password', toastConfig)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    console.log('creating a new blog..')
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs([...blogs, returnedBlog])
      console.log('..new blog created!')
      toast.success(`Succesfully added ${blogObject.title} by ${blogObject.author}`, toastConfig)
    } catch (exception) {
      console.log('..blog creation failed!')
      toast.error('Failed to create blog', toastConfig)
    }
  }

  const deleteBlog = async blogObject => {
    console.log('deleting a blog..')
    try {
      await blogService.remove(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      console.log('..blog deleted!')
      toast.success(`Deleted "${blogObject.title}"!`, toastConfig)
    } catch (exception) {
      console.log('..failed to delete blog!')
      toast.error('Failed to delete blog', toastConfig)
    }
  }

  const likeBlog = async blogObject => {
    console.log('liking a blog..')

    try {
      await blogService.update(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      console.log('..blog liked!')
    } catch (exception) {
      console.log('..failed to like blog!')
      toast.error('Failed to like blog', toastConfig)
    }
  }

  if (user === null) {
    return (
      <div>
        <ToastContainer />
        <h2>Log in to BlogList App</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <ToastContainer />
      <h1>BlogList App</h1>
      <>
        Logged in as {user.username}
        <button onClick={handleLogout} style={{ marginLeft: '15px' }}>logout</button>
      </>

      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <h2>All blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={user} />
      )}
    </div>
  )
}

export default App