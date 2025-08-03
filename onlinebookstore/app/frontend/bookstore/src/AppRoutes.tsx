import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './admin/AdminDashboard'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import SellerApprovalPage from './admin/SellerApprovalPage'
import AdminCustomers from './admin/AdminCustomers'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/approvesellers" element={<PrivateRoute><SellerApprovalPage /></PrivateRoute>} />
        <Route path="/admin/customers" element={<PrivateRoute><AdminCustomers /></PrivateRoute>} />
    </Routes>
  )
}
