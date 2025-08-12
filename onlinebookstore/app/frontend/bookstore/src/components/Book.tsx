import React from "react";
import "./css/Book.css";


interface Book {
  bookid: number;
  title: string;
  genre: string;
  avaliableCount: number;
  soldCount: number;
  seller_email: string;
  image_url?: string;
  author?: string;
  price?: number;
}

interface BookDetailsRowProps {
  book: Book;
  onClose: () => void;
}

export default function Book({ book, onClose }: BookDetailsRowProps) {
  return (
    <tr className="book-details-row">
      <td colSpan={5}>
        <div className="book-details-content">
          <button className="close-btn" onClick={onClose}>✖</button>

          <div className="book-image">
            <img
              src={book.image_url || require("../assets/bookmain.jpg")}
              alt={book.title}
            />
          </div>

          <div className="book-info">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author || "Unknown"}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Seller:</strong> {book.seller_email}</p>
            <p><strong>Price:</strong> ₹{book.price || "N/A"}</p>
            <p><strong>Stock Left:</strong> {book.avaliableCount}</p>
            <p><strong>Sold:</strong> {book.soldCount}</p>
          </div>
        </div>
      </td>
    </tr>
  );
}
