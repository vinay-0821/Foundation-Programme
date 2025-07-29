import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from './store';
import { logout } from './authSlice';

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password } = useSelector((state: RootState) => state.auth);

    
    function HandleLogout() {
        console.log('Logout successful');
        dispatch(logout());
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
