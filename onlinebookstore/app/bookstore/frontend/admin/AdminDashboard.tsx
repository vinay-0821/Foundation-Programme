import React from 'react';
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <h1>Dashboard</h1>
      <div>
        No of customers
        No of Sellers
        No of books sold
        Total Revenue
      </div>
    </div>
  )
}
