import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("👋 Logged out successfully!");
    navigate("/");
  };

  const linkStyle = {
    color: "rgba(255, 0, 0, 1)",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
  };

  const hoverEffect = (e, enter) => {
    e.target.style.transform = enter ? "scale(1.1)" : "scale(1)";
    e.target.style.color = enter ? "#ff0000ff" : "rgba(255, 0, 0, 1)";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 60px",
        // background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: "16px",
        position: "fixed",
        top: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        zIndex: 1000,
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* 🍽 Logo */}
      <h2
        style={{
          margin: 0,
          cursor: "pointer",
          transition: "transform 0.3s ease, color 0.3s ease",
          fontWeight: "800",
          background: "linear-gradient(45deg, #ff8a00, #e52e71)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        onClick={() => navigate("/")}
      >
        🍽 Bite & Dine 🍽
      </h2>

      {/* 🔗 Links */}
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {[
          { to: "/", label: "🏠 Home" },
          { to: "/menu", label: "🍕 Menu" },
          { to: "/cart", label: "🛒 Cart" },
          ...(token ? [{ to: "/myorders", label: "🧾 My Orders" }] : []),
        ].map((link, i) => (
          <Link
            key={i}
            to={link.to}
            style={linkStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            {link.label}
          </Link>
        ))}

        {/* 🔐 Auth Section */}
        {token ? (
          <>
            <Link
              to="/myprofile"
              style={linkStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
            >
              👤 My Profile
            </Link>

            {/* 👋 Hi, User Button */}
            <span
              style={{
                color: "red",
                fontWeight: "600",
                fontSize: "1rem",
                // background: "rgba(255,255,255,0.25)",
                padding: "6px 14px",
                // borderRadius: "10px",
                // backdropFilter: "blur(10px)",
                // border: "1px solid rgba(255,255,255,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              👋 Hi, {user?.name || "User"}
            </span>

            <button
              onClick={handleLogout}
              style={{
                // background: "rgba(0, 0, 0, 0.2)",
                // border: "1px solid rgba(0, 0, 0, 0.4)",
                color: "red",
                fontWeight: "500",
                // borderRadius: "10px",
                padding: "6px 16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                // backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.35)";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.2)";
                e.target.style.color = "white";
              }}
            >
              ⏻ Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={linkStyle}
            onMouseEnter={(e) => hoverEffect(e, true)}
            onMouseLeave={(e) => hoverEffect(e, false)}
          >
            🔐 Login
          </Link>
        )}
      </div>
    </nav>
  );
}
