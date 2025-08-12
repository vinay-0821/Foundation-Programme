import React from "react";
import "../seller/css/SellerDashboard.css";

export type Book = {
  id: number;
  title: string;
  author?: string;
  price?: number;
  cover?: string;
};

const BookCard: React.FC<{ book: Book; onClick?: () => void }> = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={onClick} role="button" tabIndex={0}>
      <img src={book.cover || require("../assets/bookmain.jpg")} alt={book.title} />
      <div className="book-meta">
        <div className="book-title">{book.title}</div>
        {book.author && <div className="book-author">{book.author}</div>}
        {book.price !== undefined && <div className="book-price">{book.price}</div>}
      </div>
    </div>
  );
};

export default BookCard;
