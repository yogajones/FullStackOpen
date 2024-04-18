import { Link } from "react-router-dom";

const BlogLink = ({ blog }) => {
  const blogStyle = {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} key={blog.id}>
        <b>{blog.title}</b> by {blog.author}
      </Link>
    </div>
  );
};

export default BlogLink;
