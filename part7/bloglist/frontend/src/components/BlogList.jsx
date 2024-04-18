import { useSelector } from "react-redux";
import { useRef } from "react";

import BlogForm from "./BlogForm";
import BlogLink from "./BlogLink";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormRef = useRef();

  return (
    <>
      <h2>Add new blog</h2>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <h2>All blogs</h2>
      <div>
        {blogs.map((blog) => (
          <BlogLink blog={blog} key={blog.id} />
        ))}
      </div>
    </>
  );
};

export default BlogList;
