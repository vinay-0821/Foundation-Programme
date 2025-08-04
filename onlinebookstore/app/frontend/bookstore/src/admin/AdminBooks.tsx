import React, { useEffect, useState } from 'react';
import './css/AdminCustomers.css';
import AdminNavbar from './AdminNavbar';
import { fetchBooks } from '../services/adminapis';
import debounce from 'lodash.debounce';

interface Book {
  id: number;
  title: string;
  genre: string;
  availableCount: number;
  soldCount: number;
  sellerName: string;
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortBy, setSortBy] = useState<'title' | 'genre' | 'available' | 'sold' | 'rating'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [genre, setGenre] = useState('');
  const [seller, setSeller] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks(genre, seller, title, sortBy, order);
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };

    const debouncedFetch = debounce(fetchData, 500);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [genre, seller, title, sortBy, order]);

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrder('asc');
    }
  };

  const handleBookClick = (book: Book) => {
    console.log('Clicked book:', book);
  };

  return (
    <div className="admin-customers-page">
      <AdminNavbar />
      <div className="admin-customers-container">
        <h2>Books Inventory</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Filter by genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by seller"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>
                Title {sortBy === 'title' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('genre')}>
                Genre {sortBy === 'genre' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('available')}>
                Available {sortBy === 'available' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('sold')}>
                Sold {sortBy === 'sold' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} onClick={() => handleBookClick(b)}>
                <td>{b.title}</td>
                <td>{b.genre}</td>
                <td>{b.availableCount}</td>
                {/* {b.soldCount} */}
                <td>0</td>
                <td>{b.sellerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
