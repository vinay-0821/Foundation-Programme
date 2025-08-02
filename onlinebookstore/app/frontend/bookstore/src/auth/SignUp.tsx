import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./auth.css";

export default function SignUp() {
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="signup">
      <img src={require("../assets/bookmain.jpg")} alt="bookstoreimg" />
      
      <div className="signup-form">
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
    </div>
  )
}
