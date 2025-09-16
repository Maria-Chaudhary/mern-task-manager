import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(''); // reset error
    try {
      const res = await API.post('/api/auth/register', { name, email, password });
      console.log('Register response:', res.data);
      nav('/login');
    } catch (err) {
      console.error('Frontend register error:', err.response?.data || err);
      // show backend message if exists, otherwise generic
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <span onClick={() => nav('/login')} className="link">
          Login
        </span>
      </p>
    </form>
  );
}
