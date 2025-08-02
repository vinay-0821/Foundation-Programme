// src/routes/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('token');

  // You can add additional token expiry validation here if needed.

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
