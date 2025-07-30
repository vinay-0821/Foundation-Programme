import React, { useState } from 'react'
import Home from './Home';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(email === '' || password === '') {
        setError('Email and password are required');
        return;
      }
      
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        dispatch(login({ token: data.token, email }));
        navigate('/home', { state: { email } });
      }
      else {
        setError(data.message || 'Login failed');
      }
    };


    // console.log({ email, password });

  return (
    <div className="login">
      <h1>Login</h1>
      <p style={{ color: 'red', fontStyle: 'italic' }}>{error && <span className="error">{error}</span>}</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  )
}
