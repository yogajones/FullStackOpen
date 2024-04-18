import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "../reducers/notificationReducer";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.current);

  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const like = (event) => {
    event.preventDefault();
    try {
      dispatch(likeBlog(blog));
      dispatch(notify(`You liked: ${blog.title}`));
    } catch (error) {
      dispatch(notify("Failed to like blog."));
    }
  };

  const remove = (event) => {
    event.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(notify("Blog deleted!"));
      } catch (error) {
        dispatch(notify("Failed to delete blog."));
      }
    }
  };

  const blogStyle = {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    marginBottom: 5,
    marginTop: 15,
  };

  return (
    <div style={blogStyle}>
      <h2>
        <b>{blog.title}</b> ({blog.author})
      </h2>
      <p>
        Likes: {blog.likes}{" "}
        <button onClick={like} style={{ marginLeft: "15px" }}>
          like
        </button>
      </p>
      <p>{blog.url}</p>
      {blog.user && blog.user.username && <p>Added by {blog.user.username}</p>}
      {blog.user &&
        blog.user.username &&
        blog.user.username === user.username && (
          <button onClick={remove}>remove</button>
        )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
