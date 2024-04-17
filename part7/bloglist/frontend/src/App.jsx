import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import NavigationBar from "./components/NavigationBar";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user.current);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <Router>
        <div>
          <h2>Log in to BlogList App</h2>
          <Notification />
          <LoginForm />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <h1>BlogList App</h1>
        <NavigationBar />
        <Notification />

        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
