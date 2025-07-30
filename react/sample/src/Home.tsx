import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { logout } from './authSlice';

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state: RootState) => state.auth);
    const fallbackEmail = localStorage.getItem("email");

    
    function handleLogout() {
      console.log('Logout successful');
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/login');
    }

  return ( 
    <div>
      <h1>Home</h1>
      <p>Email: {email || fallbackEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
