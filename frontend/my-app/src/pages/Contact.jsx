import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./Contact.css";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email, message })
    });

    const data = await res.json();
    setStatus(data.message);
    setEmail("");
    setMessage("");

    confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
  confetti({
  particleCount: 50,
  angle: 60,
  spread: 55,
  origin: { x: 0 }
});

confetti({
  particleCount: 50,
  angle: 120,
  spread: 55,
  origin: { x: 1 }
});
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">
          📩 Contact <span>Bite & Dine</span>
        </h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Write your issue..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="contact-btn">Send</button>
        </form>

        {status && (
  <div className="success-animation">
    <div className="success-circle">
      <span className="success-check">✓</span>
    </div>
    <p className="success-text">Email sent successfully</p>
  </div>
)}

      </div>
    </div>
  );
}
