import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        setError('Error fetching blog details');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('You must be logged in to edit a blog post.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        navigate(`/blogs/${id}`);
      } else {
        const errData = await response.json();
        setError('Failed to update blog: ' + JSON.stringify(errData));
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Blog Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            cols={50}
          />
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default BlogEditPage;
