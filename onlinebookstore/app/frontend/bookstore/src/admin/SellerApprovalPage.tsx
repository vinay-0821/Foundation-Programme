import React, { useEffect, useState } from "react";
import "./css/SellerApprovalPage.css";
import AdminNavbar from "./AdminNavbar";

type Seller = {
  id: number;
  name: string;
  email: string;
  storeName: string;
};

export default function SellerApprovalPage() {
  const [pendingSellers, setPendingSellers] = useState<Seller[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sellers/pending")
      .then((res) => res.json())
      .then((data) => setPendingSellers(data));
  }, []);

  const handleDecision = async (id: number, action: "approve" | "reject") => {
    await fetch(`http://localhost:5000/api/sellers/${action}/${id}`, {
      method: "POST",
    });
    setPendingSellers(pendingSellers.filter((s) => s.id !== id));
  };

  return (
    <div className="approval-container">
      <AdminNavbar />
      <div className="approval-sellers">
        <h1 className="approval-title">New Sellers Awaiting Approval</h1>
        {pendingSellers.length === 0 ? (
          <p className="empty-msg">No pending seller requests right now.</p>
        ) : (
          <div className="card-list">
            {pendingSellers.map((seller) => (
              <div className="approval-card" key={seller.id}>
                <div className="seller-info">
                  <h2>{seller.storeName}</h2>
                  <p>
                    <strong>Name:</strong> {seller.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {seller.email}
                  </p>
                </div>
                <div className="btn-group">
                  <button
                    className="btn-approve"
                    onClick={() => handleDecision(seller.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleDecision(seller.id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
