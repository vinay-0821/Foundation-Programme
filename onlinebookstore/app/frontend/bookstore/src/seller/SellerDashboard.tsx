import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";
import { getSellerStats, getRecentOrders } from "../services/sellerapis";
import "./css/SellerDashboard.css";

interface SellerStats {
  totalAmount: number;
  totalBooksSold: number;
  topBook: string;
  rating: number;
}

interface Order {
  id: number;
  book: string;
  date: string;
  amount: number;
}

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<SellerStats>({
    totalAmount: 0,
    totalBooksSold: 0,
    topBook: "",
    rating: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsData = await getSellerStats();
        const ordersData = await getRecentOrders();
        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SellerNavbar />
      <div className="dashboard-container">
        <h1>Seller Dashboard</h1>

        <div className="stats-section">
          <div className="stat-card blue">
            <h3>Total Amount Received</h3>
            <p>₹{stats.totalAmount.toLocaleString()}</p>
          </div>
          <div className="stat-card green" >
            <h3>Total Books Sold</h3>
            <p>{stats.totalBooksSold}</p>
          </div>
          <div className="stat-card purple">
            <h3>Top Book</h3>
            <p>{stats.topBook || "No sales yet"}</p>
          </div>
          <div className="stat-card orange">
            <h3>Customer Rating</h3>
            <p>{stats.rating} ★</p>
          </div>
        </div>

        <div className="user-table">
          <div className="table-header">
            <h2>Recent Buys</h2>
            <button onClick={() => navigate("/seller/orders")}>View All</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Book</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx}>
                  <td>{order.id}</td>
                  <td>{order.book}</td>
                  <td>{order.date}</td>
                  <td>₹{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
