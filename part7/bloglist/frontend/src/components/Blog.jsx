import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import { notify } from "../reducers/notificationReducer";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.current);
  const [comment, setComment] = useState("");

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

  const addComment = (event) => {
    event.preventDefault();
    try {
      dispatch(commentBlog(blog.id, comment));
      dispatch(notify(`Comment added!`));
      setComment("");
    } catch (error) {
      dispatch(notify("Failed to add comment."));
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
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
