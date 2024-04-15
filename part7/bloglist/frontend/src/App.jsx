import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { notify } from "./reducers/notificationReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in as", username);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("login succesful");
    } catch (exception) {
      console.log("login failed");
      dispatch(notify("Wrong username or password", "error"));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  const addBlog = async (blogObject) => {
    console.log("creating a new blog..");
    blogFormRef.current.toggleVisibility();

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs([...blogs, returnedBlog]);
      console.log("..new blog created!");
      dispatch(notify(`Added ${blogObject.title} by ${blogObject.author}`));
    } catch (exception) {
      console.log("..blog creation failed!");
      dispatch(notify("Failed to create blog", "error"));
    }
  };

  const deleteBlog = async (blogObject) => {
    console.log("deleting a blog..");
    try {
      await blogService.remove(blogObject);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      console.log("..blog deleted!");
      dispatch(notify(`Deleted "${blogObject.title}"!`));
    } catch (exception) {
      console.log("..failed to delete blog!");
      dispatch(notify("Failed to delete blog", "error"));
    }
  };

  const likeBlog = async (blogObject) => {
    console.log("liking a blog..");

    try {
      await blogService.update(blogObject);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
      console.log("..blog liked!");
      dispatch(notify("Blog liked!"));
    } catch (exception) {
      console.log("..failed to like blog!");
      dispatch(notify("Failed to like blog", "error"));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogList App</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>BlogList App</h1>
      <Notification />
      <>
        Logged in as {user.username}
        <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
          logout
        </button>
      </>

      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <h2>All blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
