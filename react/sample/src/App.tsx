import React, { useEffect } from 'react';
import './App.css';

import Login from './Login';
import Signup from './Signup';
import { Navigate, Route, } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import { useDispatch } from 'react-redux';
import { login, logout } from './authSlice';
import { jwtDecode } from 'jwt-decode';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number; email: string }>(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          dispatch(logout());
        } else {
          dispatch(login({ token}));
        }
      } 
      catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
