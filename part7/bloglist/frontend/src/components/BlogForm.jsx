import { useState } from "react";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog({ title, author, url }));
      dispatch(notify(`Added ${title} by ${author}`));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      dispatch(notify("Failed to create blog", "error"));
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            id="url-input"
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
