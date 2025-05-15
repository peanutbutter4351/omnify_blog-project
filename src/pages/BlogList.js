import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('http://127.0.0.1:8000/api/blogs/');
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(currentPageUrl);
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();

        setBlogs(data.results || data); // Adjust if your backend sends paginated results inside 'results'
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [currentPageUrl]);

  return (
    <div>
      <h1>Blog List</h1>

      {token && (
        <button onClick={() => navigate('/blogs/create')}>Create New Blog</button>
      )}

      {loading && <p>Loading blogs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author.username} —{' '}
                {new Date(blog.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>

          <div>
            {prevPageUrl && (
              <button onClick={() => setCurrentPageUrl(prevPageUrl)}>Previous</button>
            )}
            {nextPageUrl && (
              <button onClick={() => setCurrentPageUrl(nextPageUrl)}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogListPage;
