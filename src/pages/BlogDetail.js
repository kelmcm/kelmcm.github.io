import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { fetchBlog } from "./Blog";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    fetchBlog(slug)
      .then(setBlog)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <p>Blog not found.</p>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <article>
      <h1>{blog.title}</h1>
      {blog.date && <small className="blog-date">{blog.date}</small>}
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked.parse(blog.content) }}
      />
    </article>
  );
};

export default BlogDetail;
