import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username'); // Save this during login

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to fetch blog');
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!token) {
      alert('You must be logged in to delete a blog post.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate('/');
      } else {
        const errData = await res.json();
        alert('Failed to delete blog: ' + JSON.stringify(errData));
      }
    } catch (err) {
      alert('Error deleting blog: ' + err.message);
    }
  };

  if (!blog) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const isAuthor = blog.author.username === username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author.username}</p>
      <p><strong>Created At:</strong> {new Date(blog.created_at).toLocaleString()}</p>
      <p>{blog.content}</p>

      {isAuthor && (
        <>
          <Link to={`/blogs/${id}/edit`} style={{ marginRight: '10px' }}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      <br /><br />
      <Link to="/">← Back to Blogs</Link>
    </div>
  );
};

export default BlogDetailPage;
