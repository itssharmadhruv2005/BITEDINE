
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [sortType, setSortType] = useState("date-desc");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.email && !user.name) return;

    fetch(`http://localhost:4000/api/orders/${user.email || user.name}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.reverse()))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [user]);

  const sortOrders = (orders, type) => {
    const sorted = [...orders];
    if (type === "name-asc") {
      sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (type === "date-asc") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (type === "date-desc") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sorted;
  };

  const sortedOrders = sortOrders(orders, sortType);

  const downloadOrders = () => {
    if (orders.length === 0) {
      alert("😔 No orders available to download.");
      return;
    }

    let content = "📦 My Orders\n\n";
    sortedOrders.forEach((order, index) => {
      content += `🧾 Order ${index + 1}\n`;
      content += `Order ID: ${order.id}\n`;
      content += `Name: ${order.name}\n`;
      content += `Email: ${order.email || "N/A"}\n`;
      content += `Total: ₹${order.total}\n`;
      content += `Address: ${order.address}\n`;
      content += `Phone: ${order.phone || "N/A"}\n`;
      content += `Status: ${order.status}\n`;
      content += `Placed On: ${new Date(order.createdAt).toLocaleString()}\n`;
      content += `------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyOrders.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        padding: "60px 20px 120px",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        position: "relative",
      }}
    >
      <motion.h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "40px",
          paddingTop: "60px",
          color: "#fff",
          textShadow: "0 2px 10px rgba(255,255,255,0.6)",
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ My Orders
      </motion.h1>

      {orders.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <label
            htmlFor="sort"
            style={{
              fontWeight: "600",
              fontSize: "1.1rem",
              marginRight: "10px",
              color: "#fff",
            }}
          >
            🔍 Sort By:
          </label>
          <select
            id="sort"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: "rgba(255, 255, 255, 0.3)",
              color: "#fff",
              backdropFilter: "blur(15px)",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            <option value="date-desc">🕓 Date (Newest First)</option>
            <option value="date-asc">🗓️ Date (Oldest First)</option>
            <option value="name-asc">🔤 Item Name (A–Z)</option>
          </select>
        </div>
      )}

      {orders.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          😔 You haven’t placed any orders yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
          }}
        >
          {sortedOrders.map((order, i) => (
            <motion.div
              key={order.id}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                width: "90%",
                maxWidth: "600px",
                padding: "25px 35px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 4px 25px rgba(255,255,255,0.15)",
                transition: "transform 0.3s ease",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 30px rgba(255,255,255,0.25)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  color: "#fff",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                🧾 Order ID:{" "}
                <span style={{ color: "#ffe6b3" }}>{order.id}</span>
              </h3>

              <p>👤 <b>Name:</b> {order.name}</p>
              <p>📧 <b>Email:</b> {order.email || "N/A"}</p>
              <p>💸 <b>Total:</b> ₹{order.total}</p>
              <p>🏠 <b>Address:</b> {order.address}</p>
              <p>📞 <b>Phone:</b> {order.phone || "N/A"}</p>
              <p>
                🚚 <b>Status:</b>{" "}
                <span style={{ color: "#baffc9", fontWeight: "600" }}>
                  {order.status}
                </span>
              </p>
              <p>
                ⏰ <b>Placed On:</b>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <motion.button
          onClick={downloadOrders}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: "fixed",
            bottom: "35px",
            right: "45px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(15px)",
            borderRadius: "30px",
            color: "#fff",
            padding: "14px 30px",
            fontSize: "1.1rem",
            fontWeight: "600",
            boxShadow: "0 4px 20px rgba(255,255,255,0.25)",
            cursor: "pointer",
          }}
        >
          📥 Download Orders
        </motion.button>
      )}
    </div>
  );
}
