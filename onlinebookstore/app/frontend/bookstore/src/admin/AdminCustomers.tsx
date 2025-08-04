import React, { useEffect, useState } from 'react';
import './css/AdminCustomers.css';
import AdminNavbar from './AdminNavbar';

interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  amount_spent: number;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'amount'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [sortBy, order, search]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(
        `/api/admin/customers?sortBy=${sortBy}&order=${order}&search=${search}`
      );
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleSort = (column: 'name' | 'email' | 'amount') => {
    if (sortBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrder('asc');
    }
  };

  return (
    <div className="admin-customers-page">
      <AdminNavbar />
      <div className='admin-customers-container'>
        <h2>All Customers</h2>
        <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
        />

        <table className="customer-table">
            <thead>
            <tr>
                <th onClick={() => handleSort('name')}>
                Name {sortBy === 'name' && (order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('email')}>
                Email {sortBy === 'email' && (order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('amount')}>
                Amount Spent {sortBy === 'amount' && (order === 'asc' ? '↑' : '↓')}
                </th>
            </tr>
            </thead>
            <tbody>
            {customers.map((c) => (
                <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>₹{c.amount_spent.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
