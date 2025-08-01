import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './authSlice';

export default function Home() {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  fetch('http://localhost:5000/home', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setUserData(data))
    .catch(err => console.error('Error fetching user:', err));
}, []);


  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>Home Page</h1>
      {userData ? (
        <>
          <p>Welcome, {userData.name}!</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
