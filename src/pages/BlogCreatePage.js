import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('You must be logged in to create a blog post.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/blogs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/blogs/${data.id}`);
      } else {
        const errData = await response.json();
        setError('Failed to create blog post: ' + JSON.stringify(errData));
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
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
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default BlogCreatePage;
