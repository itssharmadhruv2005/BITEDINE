import React, { useState, useEffect } from "react";
import "./MyProfile.css";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token || !u.email) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }
    setUser(u);
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || "",
      address: u.address || "",
      profilePhoto: u.profilePhoto || "",
    });
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Profile updated successfully!");
      setUser(data.user);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setForm({ ...form, profilePhoto: imageURL });
      setShowPhotoOptions(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 My Profile</h2>

      <div className="profile-card">
        <div className="profile-photo-section">
          {form.profilePhoto === "emoji" ? (
            <div
              className="profile-photo emoji-avatar"
              onClick={() => setShowPhotoOptions(true)}
            >
              😎
            </div>
          ) : (
            <img
              src={form.profilePhoto || "https://via.placeholder.com/120"}
              alt="Profile"
              className="profile-photo"
              onClick={() => setShowPhotoOptions(true)}
            />
          )}

          {showPhotoOptions && (
            <div className="photo-popup">
              <label className="photo-option">
                📤 Upload New
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />
              </label>

              <button
                className="photo-option remove"
                onClick={() => {
                  setForm({ ...form, profilePhoto: "emoji" });
                  setShowPhotoOptions(false);
                }}
              >
                🧹 Remove Photo
              </button>

              <button
                className="photo-option cancel"
                onClick={() => setShowPhotoOptions(false)}
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-info">
          {editMode ? (
            <>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <div className="button-group">
                <button onClick={handleUpdate} className="save-btn">
                  💾 Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="cancel-btn"
                >
                  ❌ Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                👤 <strong>Name:</strong> {user.name}
              </p>
              <p>
                📧 <strong>Email:</strong> {user.email}
              </p>
              <p>
                📞 <strong>Phone:</strong> {user.phone || "Not added"}
              </p>
              <p>
                🏠 <strong>Address:</strong> {user.address || "Not added"}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="edit-btn"
              >
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
