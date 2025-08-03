import React from 'react'
import './Home.css';
import Navbar from './Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Welcome to BookVerse 📚</h1>
        <p className="home-description">
          Discover, explore, and shop your favorite books in one place.
          <br />
          Login or create an account to get started!
        </p>
      </div>
    </div>
  )
}
