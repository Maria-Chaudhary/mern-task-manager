import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';


function PrivateRoute({ children }) {
const token = localStorage.getItem('token');
return token ? children : <Navigate to="/login" replace />;
}


export default function App() {
const logout = () => {
localStorage.removeItem('token');
window.location.href = '/login';
};


return (
<div className="container">
<header>
<h1>Task Manager</h1>
<nav>
<Link to="/">Home</Link>
{localStorage.getItem('token') ? (
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
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
</Routes>
</main>
</div>
);
}

