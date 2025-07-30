import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './store';
// import { JSX } from 'react/jsx-runtime';
import { JSX } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
