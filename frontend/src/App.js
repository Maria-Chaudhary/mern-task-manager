import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // update state to hide Logout button
  };

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <nav>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <button className="link-btn" onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          {/* Pass setIsLoggedIn to Login so it updates state after login */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}
