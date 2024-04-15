import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  // REFACTOR: don't pass user, use store state
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <>
      <h2>All blogs</h2>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </>
  );
};

export default BlogList;
