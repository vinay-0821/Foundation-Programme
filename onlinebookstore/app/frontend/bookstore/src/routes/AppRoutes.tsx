import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../admin/AdminDashboard'
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import PrivateRoute from './PrivateRoute'
import Home from '../components/Home'
import SellerApprovalPage from '../admin/SellerApprovalPage'
import AdminCustomers from '../admin/AdminCustomers'
import AdminSellers from '../admin/AdminSellers'
import AdminBooks from '../admin/AdminBooks'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/approvesellers" element={<PrivateRoute allowedRoles={['admin']}><SellerApprovalPage /></PrivateRoute>} />
        <Route path="/admin/customers" element={<PrivateRoute allowedRoles={['admin']}><AdminCustomers /></PrivateRoute>} />
        <Route path="/admin/sellers" element={<PrivateRoute allowedRoles={['admin']}><AdminSellers /></PrivateRoute>} />
        <Route path="/admin/books" element={<PrivateRoute allowedRoles={['admin']}><AdminBooks /></PrivateRoute>} />
    </Routes>
  )
}
