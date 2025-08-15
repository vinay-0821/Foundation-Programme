import React, { useEffect, useState } from "react";
import SellerNavbar from "./SellerNavbar";
import { fetchSellerOrders } from "../services/sellerapis"; // New API call
import debounce from "lodash.debounce";
import "./css/SellerBooks.css";

interface SellerOrder {
  orderid: number;
  bookTitle: string;
  buyerEmail: string;
  date: string;
  amount: number;
  status: string;
}

export default function SellerOrders() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [sortBy, setSortBy] = useState<keyof SellerOrder>("date");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [buyerFilter, setBuyerFilter] = useState("");
  const [bookFilter, setBookFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSellerOrders(
          orderIdFilter,
          buyerFilter,
          bookFilter,
          sortBy,
          order
        );
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    const debouncedFetch = debounce(fetchData, 400);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [orderIdFilter, buyerFilter, bookFilter, sortBy, order]);

  const handleSort = (column: keyof SellerOrder) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  return (
    <div className="admin-customers-page">
      <SellerNavbar />
      <div className="admin-customers-container">
        <h2>Seller Orders</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Filter by Order ID"
            value={orderIdFilter}
            onChange={(e) => setOrderIdFilter(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by Buyer Email"
            value={buyerFilter}
            onChange={(e) => setBuyerFilter(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by Book Title"
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("orderid")}>
                Order ID {sortBy === "orderid" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("bookTitle")}>
                Book {sortBy === "bookTitle" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("buyerEmail")}>
                Buyer {sortBy === "buyerEmail" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("date")}>
                Date {sortBy === "date" && (order === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount {sortBy === "amount" && (order === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderid}>
                <td>{o.orderid}</td>
                <td>{o.bookTitle}</td>
                <td>{o.buyerEmail}</td>
                <td>{o.date}</td>
                <td>{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
