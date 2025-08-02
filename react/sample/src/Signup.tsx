import React, { useState } from 'react'
import Login from './Login';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } 
      else {
        setError(data.message || 'Signup failed');
      }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <p style={{ color: 'red', fontStyle: 'italic' }}>{error && <span className="error">{error}</span>}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

