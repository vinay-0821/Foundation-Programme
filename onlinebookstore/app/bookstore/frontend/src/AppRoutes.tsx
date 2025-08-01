import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../admin/AdminDashboard'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}
