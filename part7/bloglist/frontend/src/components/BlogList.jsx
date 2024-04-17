import { useSelector } from "react-redux";
import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormRef = useRef();

  return (
    <>
      <h2>All blogs</h2>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogList;
