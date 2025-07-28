import React, { useState } from 'react'
import Home from './Home';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const signupData = location.state as { email: string; password: string; username: string } | null;

    // console.log('signupData:', signupData );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(email === '' || password === '') {
        setError('Email and password are required');
        return;
      }
      else if(signupData && email === signupData.email && password === signupData.password) {
        console.log('Login successful');
        setError('');
        setSuccess(true);
        navigate('/home', { state: { email, password } });
      }
      else if(email === "vinay@gmail.com" && password === "1234") {
        console.log('Login successful');
        setError('');
        setSuccess(true);
        navigate('/home', { state: { email, password } });
      } 
      else {
        setError('Invalid email or password');
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
