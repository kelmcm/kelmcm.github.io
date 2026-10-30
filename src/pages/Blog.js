import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Automatically discover all .md files in src/blogs/
const blogContext = require.context("../blogs", false, /\.md$/);

const blogFiles = Object.fromEntries(
  blogContext.keys().map((key) => {
    const slug = key.replace(/^\.\//, "").replace(/\.md$/, "");
    const mod = blogContext(key);
    return [slug, mod.default || mod];
  })
);

function parseMarkdownBlog(slug, rawMarkdown) {
  const match = rawMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = { slug, title: slug, date: "", excerpt: "" };
  let content = rawMarkdown;

  if (match) {
    const frontmatter = match[1];
    content = match[2];
    frontmatter.split(/\r?\n/).forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        if (key) meta[key] = value;
      }
    });
  }

  return { ...meta, content };
}

export async function fetchBlog(slug) {
  const fileUrl = blogFiles[slug];
  if (!fileUrl) throw new Error(`Blog not found: ${slug}`);
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Blog not found: ${slug}`);
  const text = await res.text();
  return parseMarkdownBlog(slug, text);
}

async function fetchAllBlogs() {
  const slugs = Object.keys(blogFiles);
  const blogs = await Promise.all(slugs.map((slug) => fetchBlog(slug)));
  return blogs.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs()
      .then(setBlogs)
      .catch(() => setBlogs([]));
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.slug} className="blog-preview">
          <h3>
            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </h3>
          {blog.date && <small className="blog-date">{blog.date}</small>}
          {blog.excerpt && <p>{blog.excerpt}</p>}
        </div>
      ))}
    </div>
  );
};

export default Blog;
