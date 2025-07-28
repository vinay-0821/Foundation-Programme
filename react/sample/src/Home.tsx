import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, password } = location.state as { email: string; password: string } || {};
    
    function HandleLogout() {
        console.log('Logout successful');
        navigate('/login');
    }

  return (
    <div>
      <h1>Home</h1>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <button onClick={HandleLogout}>Logout</button>
    </div>
  )
}
