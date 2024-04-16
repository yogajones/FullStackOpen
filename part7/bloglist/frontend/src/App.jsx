import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogList from "./components/BlogList";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user.user);
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogList App</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h1>BlogList App</h1>
      <Notification />
      <LogoutForm />

      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
