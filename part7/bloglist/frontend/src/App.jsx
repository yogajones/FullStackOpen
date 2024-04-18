import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import NavigationBar from "./components/NavigationBar";
import { updateBlogs } from "./reducers/blogReducer";
import { updateAllUsers, updateCurrentUser } from "./reducers/userReducer";
import useRouteById from "./hooks/useRouteById";

const App = () => {
  const currentUser = useSelector((state) => state.user.current);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentUser());
    dispatch(updateBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateAllUsers());
  }, [blogs, dispatch]);

  const userDetails = useRouteById("/users/:id", (state) => state.user.all);
  const blogDetails = useRouteById("/blogs/:id", (state) => state.blogs);

  if (currentUser === null) {
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
      <NavigationBar />
      <Notification />

      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog blog={blogDetails} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={userDetails} />} />
      </Routes>
    </div>
  );
};

export default App;
