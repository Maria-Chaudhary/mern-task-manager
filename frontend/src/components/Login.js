import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(''); // reset error
    try {
      const res = await API.post('/api/auth/login', { email, password });
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      nav('/'); // Go to home (TaskList) after login
    } catch (err) {
      console.error('Frontend login error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
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
      <button type="submit">Login</button>
      <p>
        Don’t have an account?{' '}
        <span onClick={() => nav('/register')} className="link">
          Register
        </span>
      </p>
    </form>
  );
}
