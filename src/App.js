import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import BlogList from './pages/BlogList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BlogCreatePage from './pages/BlogCreatePage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogEditPage from './pages/BlogEditPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/blogs/create"
          element={
            <PrivateRoute>
              <BlogCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id/edit"
          element={
            <PrivateRoute>
              <BlogEditPage />
            </PrivateRoute>
          }
        />

        <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
