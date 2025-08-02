import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './admin/AdminDashboard'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import PrivateRoute from './PrivateRoute'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
    </Routes>
  )
}
