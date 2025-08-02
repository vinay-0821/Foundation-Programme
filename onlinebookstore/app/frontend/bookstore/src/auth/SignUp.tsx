import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./auth.css";
import axios from 'axios';

export default function SignUp() {
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      setError('Please fill in all fields');
      return;
    }

    console.log("handleSubmit in signup");

    try {
      // const res = await axios.post('http://localhost:5000/signup', {
      //   username,
      //   email,
      //   password,
      // });

      // console.log(res);

      // if(res){
      //   navigate('/login'); 
      // }

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("it is response",response);

      const data = await response.json();
        if (response.ok) {
          navigate('/login');
        } 
        else {
          setError(data.message || 'User alreadyy exist');
        }
      
    } 
    catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || 'SignUp failed');
    }
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
