import React, { useEffect, useState } from "react";
import SellerNavbar from "./SellerNavbar";
import "./css/SellerProfile.css";
import { getSellerProfile, updateSellerProfile } from "../services/sellerapis";

export default function SellerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState({
    name: "",
    businessName: "",
    profilePicture: "/images/default-seller.png",
    email: "",
    phone: "",
    location: "",
    joined: "",
    bio: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const data = await getSellerProfile();
        setSeller(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateSellerProfile(seller);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <>
        <SellerNavbar />
        <div className="seller-profile-container">
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SellerNavbar />
      <div className="seller-profile-container">
        <div className="profile-header">
          <img
            src={seller.profilePicture}
            alt="Seller"
            className="profile-pic"
          />
          <div>
            <h1>{seller.businessName}</h1>
            <p>Owner: {seller.name}</p>
            <p>Joined: {seller.joined}</p>
          </div>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={seller.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                title="Full Name"
              />

              <label htmlFor="businessName">Business Name</label>
              <input
                id="businessName"
                name="businessName"
                value={seller.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                title="Business Name"
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={seller.email}
                onChange={handleChange}
                placeholder="Enter your email"
                title="Email"
              />

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                value={seller.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                title="Phone Number"
              />

              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                value={seller.location}
                onChange={handleChange}
                placeholder="Enter your location"
                title="Location"
              />

              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={seller.bio}
                onChange={handleChange}
                placeholder="Write something about yourself"
                title="Bio"
              />

              <div className="profile-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {seller.email}
              </p>
              <p>
                <strong>Phone:</strong> {seller.phone}
              </p>
              <p>
                <strong>Location:</strong> {seller.location}
              </p>
              <p>
                <strong>Bio:</strong> {seller.bio}
              </p>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
