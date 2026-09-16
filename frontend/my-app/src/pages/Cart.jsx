import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [step, setStep] = useState("details");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [bankPhone, setBankPhone] = useState("");
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    cardNumber: "",
    cvv: "",
  });

  useEffect(() => {
    const loadCart = () =>
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const updateQty = (id, change) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item
        )
        .filter((item) => item.qty > 0);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  /* ---------- ✅ SEND OTP ---------- */
  const generateOtp = async () => {
    try {
      const phoneNumber = userInfo.phone || bankPhone;
      if (!phoneNumber) {
        alert("📱 Please enter your phone number first!");
        return;
      }

      const res = await fetch("http://localhost:4000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ OTP sent successfully to ${phoneNumber}`);
        setShowOtpInput(true);
      } else {
        alert("❌ Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending OTP.");
    }
  };

  /* ---------- ✅ VERIFY OTP ---------- */
  const verifyOtpAndCheckout = async () => {
    try {
      const phoneNumber = userInfo.phone || bankPhone;
      if (!otp) {
        alert("⚠️ Please enter OTP first!");
        return;
      }

      const res = await fetch("http://localhost:4000/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });

      const data = await res.json();
      if (data.success) {
        handleCheckout();
      } else {
        alert("❌ Invalid OTP! Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error verifying OTP.");
    }
  };

  /* ---------- ✅ PLACE ORDER ---------- */
  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const orderData = {
        name: userInfo.name || user.name || "Guest User",
        email: user.email || "guest@example.com",
        phone: userInfo.phone || user.phone || "",
        address: userInfo.address,
        items: cart,
        total,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("❌ Failed to place order: " + error.message);
        return;
      }

      const order = await res.json();
      setStep("success");
      setCart([]);
      localStorage.removeItem("cart");
      confetti();
      alert(`✅ Order placed successfully! 🎉\n🆔 Order ID: ${order.id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setPaymentMethod("");
    setShowOtpInput(false);
    navigate("/cart");
  };

  /* ---------- 🧭 MODAL DIALOG ---------- */
  const renderDialogContent = () => {
    if (step === "details") {
      return (
        <>
          <h3 style={titleStyle}>Enter Your Details</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Address"
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, phone: e.target.value })
            }
            style={inputStyle}
          />
          <button onClick={() => setStep("payment")} style={confirmBtnStyle}>
            Next →
          </button>
        </>
      );
    }

    if (step === "payment") {
      return (
        <>
          <h3 style={titleStyle}>Choose Payment Method</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              style={methodBtnStyle}
              onClick={() => setPaymentMethod("qr")}
            >
              📱 QR Payment
            </button>
            <button
              style={methodBtnStyle}
              onClick={() => setPaymentMethod("card")}
            >
              💳 Card Payment
            </button>
            <button
              style={methodBtnStyle}
              onClick={() => setPaymentMethod("netbanking")}
            >
              🏦 Net Banking
            </button>
          </div>

          {paymentMethod && (
            <div style={{ marginTop: "20px" }}>
              {/* --- QR PAYMENT --- */}
              {paymentMethod === "qr" && (
                <>
                  <p style={hintText}>Scan to Pay</p>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Name:${userInfo.name}%20|%20Total:₹${total}`}
                      alt="QR"
                      style={qrStyle}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <button onClick={generateOtp} style={otpBtnStyle}>
                    Send OTP
                  </button>
                  {showOtpInput && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={inputStyle}
                      />
                      <button
                        onClick={verifyOtpAndCheckout}
                        style={confirmBtnStyle}
                      >
                        Pay ₹{total}
                      </button>
                    </>
                  )}
                  <button onClick={handleCancel} style={cancelBtnStyle}>
                    ❌ Cancel
                  </button>
                </>
              )}

              {/* --- CARD PAYMENT --- */}
              {paymentMethod === "card" && (
                <>
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={userInfo.cardNumber}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        cardNumber: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={userInfo.cvv}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, cvv: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <button onClick={generateOtp} style={otpBtnStyle}>
                    Send OTP
                  </button>
                  {showOtpInput && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={inputStyle}
                      />
                      <button
                        onClick={verifyOtpAndCheckout}
                        style={confirmBtnStyle}
                      >
                        Pay ₹{total}
                      </button>
                    </>
                  )}
                  <button onClick={handleCancel} style={cancelBtnStyle}>
                    ❌ Cancel
                  </button>
                </>
              )}

              {/* --- NET BANKING --- */}
              {paymentMethod === "netbanking" && (
                <>
                  <input
                    type="text"
                    placeholder="Account Holder Name"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Registered Phone Number"
                    value={bankPhone}
                    onChange={(e) => setBankPhone(e.target.value)}
                    style={inputStyle}
                  />
                  <button onClick={generateOtp} style={otpBtnStyle}>
                    Send OTP
                  </button>
                  {showOtpInput && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={inputStyle}
                      />
                      <button
                        onClick={verifyOtpAndCheckout}
                        style={confirmBtnStyle}
                      >
                        Pay ₹{total}
                      </button>
                    </>
                  )}
                  <button onClick={handleCancel} style={cancelBtnStyle}>
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </>
      );
    }

    if (step === "success") {
      return (
        <div style={{ textAlign: "center", color: "#28A745" }}>
          <h2>✅ Payment Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <button
            onClick={() => {
              setShowDialog(false);
              setStep("details");
            }}
            style={confirmBtnStyle}
          >
            OK
          </button>
        </div>
      );
    }
  };

  return (
    <div style={mainBg}>
      <h1 style={heading}>🛒 Your Cart</h1>
      <div style={glassCard}>
        {cart.length === 0 ? (
          <p style={emptyText}>Your cart is empty.</p>
        ) : (
          <>
            <div style={cartHeader}>
              <span>Item</span>
              <span style={{ textAlign: "center" }}>Select Quantity</span>
              <span style={{ textAlign: "right" }}>Price</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} style={cartRow}>
                <span>{item.name}</span>
                <div style={qtyBox}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    style={qtyBtn("#ff4d4d")}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    style={qtyBtn("#28a745")}
                  >
                    +
                  </button>
                </div>
                <span style={{ textAlign: "right" }}>
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
            <h3 style={{ textAlign: "right", color: "#28A745" }}>
              Total: ₹{total}
            </h3>
          </>
        )}
      </div>

      {/* <button onClick={() => setShowDialog(true)} style={payBtn}>
        💳 Pay Now
      </button> */}

      <button
  onClick={() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("🔐 Please login first to continue with payment.");
      navigate("/login");
      return;
    }

    setShowDialog(true);
  }}
  style={payBtn}
>
  💳 Pay Now
</button>
      <button onClick={() => navigate("/menu")} style={backBtn}>
        🍽 Back to Menu
      </button>

      {showDialog && (
        <div style={overlay}>
          <div style={dialogGlass}>{renderDialogContent()}</div>
        </div>
      )}
    </div>
  );
}

/* --- Styles remain unchanged --- */
const mainBg = {
  minHeight: "100vh",
  // background:
  //   "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(255,255,255,0.1))",
  // backdropFilter: "blur(10px)",
  // WebkitBackdropFilter: "blur(10px)",
  background: "url('/public/cart6.jpg') no-repeat center center/cover",
  padding: "120px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const glassCard = {
  maxWidth: "800px",
  width: "90%",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "30px",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  border: "1px solid rgba(255,255,255,0.3)",
};
const dialogGlass = {
  background: "rgba(255, 255, 255, 0.25)",
  padding: "30px",
  borderRadius: "20px",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  width: "420px",
};
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};
const titleStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
const confirmBtnStyle = {
  background: "#28A745",
  color: "#fff",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  width: "100%",
};
const methodBtnStyle = {
  background: "rgba(255,255,255,0.3)",
  color: "#000",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: "600",
  backdropFilter: "blur(10px)",
};
const otpBtnStyle = { ...confirmBtnStyle, background: "#007BFF" };
const cancelBtnStyle = { ...confirmBtnStyle, background: "#6c757d" };
const payBtn = {
  position: "fixed",
  bottom: "30px",
  right: "40px",
  background: "rgba(229, 229, 229, 0.8)",
  color: "#fff",
  border: "none",
  padding: "14px 30px",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "600",
  backdropFilter: "blur(10px)",
};
const backBtn = {
  position: "fixed",
  bottom: "30px",
  left: "40px",
  background: "rgba(212, 212, 212, 0.8)",
  color: "#fff",
  border: "none",
  padding: "14px 30px",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "600",
  backdropFilter: "blur(10px)",
};
const qtyBtn = (bg) => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: bg,
  color: "#fff",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
});
const cartHeader = {
  display: "grid",
  gridTemplateColumns: "2fr 1.5fr 1fr",
  marginBottom: "10px",
  fontWeight: "600",
};
const cartRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1.5fr 1fr",
  alignItems: "center",
  background: "rgba(255,255,255,0.3)",
  padding: "12px 18px",
  borderRadius: "10px",
  marginBottom: "12px",
  backdropFilter: "blur(10px)",
};
const qtyBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
const heading = {
  color: "#000",
  marginBottom: "30px",
  textAlign: "center",
  fontWeight: "700",
};
const emptyText = { textAlign: "center", color: "#555" };
const qrStyle = { borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" };
const hintText = { textAlign: "center", color: "#444" };
